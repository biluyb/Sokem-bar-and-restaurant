/**
 * Centralized, high-performance Email Delivery Service
 * Uses direct SSL (port 465) with connection pooling to eliminate
 * multi-step STARTTLS negotiation latency and prevent serverless timeouts.
 */

import nodemailer from "nodemailer";

type MailTransporter = ReturnType<typeof nodemailer.createTransport>;

export interface SendMailOptions {
  fromName?: string;
  replyTo?: string;
  to?: string;
  subject: string;
  text: string;
  html: string;
}

// Global cached transporter for connection pooling across warm serverless invocations
let cachedTransporter: MailTransporter | null = null;

function getTransporter(): MailTransporter | null {
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  if (!smtpUser || !smtpPass) {
    return null;
  }

  if (cachedTransporter) {
    return cachedTransporter;
  }

  const cleanPass = smtpPass.replace(/\s+/g, "");
  const isSslPort = smtpPort === 465;

  cachedTransporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: isSslPort, // true for 465, false for 587
    auth: {
      user: smtpUser,
      pass: cleanPass,
    },
    pool: true, // Enable connection pooling
    maxConnections: 3,
    maxMessages: 50,
    // Strict, fast timeouts to avoid serverless hangs
    connectionTimeout: 7000,
    greetingTimeout: 5000,
    socketTimeout: 10000,
  });

  return cachedTransporter;
}

/**
 * Sends an email synchronously or asynchronously.
 * Catches errors cleanly without throwing unhandled exceptions.
 */
export async function sendEmail({
  fromName = "Sokem Bar & Restaurant",
  replyTo,
  to,
  subject,
  text,
  html,
}: SendMailOptions): Promise<{ success: boolean; error?: string }> {
  const transporter = getTransporter();
  const recipient = to || process.env.CONTACT_EMAIL || "biluquick123@gmail.com";
  const senderUser = process.env.SMTP_USER;

  if (!transporter || !senderUser) {
    console.warn("[Email Service] SMTP is not fully configured. Email was not dispatched.");
    return { success: false, error: "SMTP credentials not configured" };
  }

  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${senderUser}>`,
      replyTo: replyTo || senderUser,
      to: recipient,
      subject,
      text,
      html,
    });

    console.log(`[Email Service] Sent: ${info.messageId} to ${recipient}`);
    return { success: true };
  } catch (error) {
    console.error("[Email Service] Dispatch error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to send email",
    };
  }
}
