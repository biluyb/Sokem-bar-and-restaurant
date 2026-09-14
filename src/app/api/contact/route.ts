import { NextResponse } from "next/server";
import { ContactFormSchema } from "@/lib/validators/auth";
import { sendEmail } from "@/lib/email";

// In-memory rate limiting map: IP -> { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    // 1. IP-based Rate Limiting (Guard against spam / mail flooding)
    const forwardedFor = request.headers.get("x-forwarded-for");
    const clientIp = forwardedFor ? forwardedFor.split(",")[0].trim() : "unknown";
    const now = Date.now();

    const rateEntry = rateLimitMap.get(clientIp);
    if (rateEntry) {
      if (now < rateEntry.resetTime) {
        if (rateEntry.count >= MAX_REQUESTS_PER_WINDOW) {
          return NextResponse.json(
            { error: "Too many messages sent. Please wait a few minutes before trying again." },
            { status: 429 }
          );
        }
        rateEntry.count += 1;
      } else {
        rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
      }
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await request.json();

    // 2. Schema Validation
    const result = ContactFormSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid form input. Please check your details.", issues: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;
    const contactRecipient = process.env.CONTACT_EMAIL || "biluquick123@gmail.com";

    // Fast, pooled direct SSL email delivery
    await sendEmail({
      fromName: `${name} (via Sokem Web)`,
      replyTo: email,
      to: contactRecipient,
      subject: `[Sokem Inquiry] ${subject}`,
      text: `From: ${name} (${email})\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 8px;">
          <h2 style="color: #f59e0b; border-bottom: 1px solid #334155; padding-bottom: 10px;">New Message from Sokem Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #38bdf8;">${email}</a></p>
          <p><strong>Subject:</strong> ${subject}</p>
          <hr style="border: 0; border-top: 1px solid #334155; margin: 20px 0;" />
          <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully. Our team will contact you shortly.",
    });
  } catch (error) {
    console.error("[API Contact] Error sending email:", error);
    return NextResponse.json(
      { error: "Failed to send your message. Please try again later or reach us directly by phone." },
      { status: 500 }
    );
  }
}
