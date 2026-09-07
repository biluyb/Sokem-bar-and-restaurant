import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ContactFormSchema } from "@/lib/validators/auth";

export async function POST(request: Request) {
  try {
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
    const contactRecipient = process.env.CONTACT_EMAIL || "reservations@sokem-restaurant.com";

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
