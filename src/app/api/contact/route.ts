import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactFormSchema } from "@/lib/validators/auth";

// In-memory rate limiting map: IP -> { count: number, resetTime: number }
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    // Basic IP rate limiting
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Too many messages sent. Please wait a few minutes before trying again." },
          { status: 429 }
        );
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await request.json();
    const result = ContactFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { name, email, subject, message } = result.data;

    // Check if SMTP environment variables are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const contactRecipient = process.env.CONTACT_EMAIL || "biluquick123@gmail.com";

    if (smtpHost && smtpUser && smtpPass) {
      const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpPort === 465,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });

      await transporter.sendMail({
        from: `"${name}" <${smtpUser}>`,
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

      console.log(`[Contact] Email sent successfully via SMTP to ${contactRecipient}`);
    } else {
      // In development / when SMTP credentials are not yet configured:
      console.log("[Contact] SMTP credentials not provided in environment. Simulated email dispatch:", {
        from: `${name} <${email}>`,
        subject,
        message,
        recipient: contactRecipient,
      });
    }

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
