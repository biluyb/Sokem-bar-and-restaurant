import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ReservationSchema } from "@/lib/validators/reservation";

// In-memory rate limiting: max 5 reservations per 10 minutes per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;

export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "anonymous";

    const now = Date.now();
    const rateData = rateLimitMap.get(ip);

    if (rateData && now < rateData.resetTime) {
      if (rateData.count >= MAX_REQUESTS_PER_WINDOW) {
        return NextResponse.json(
          { error: "Too many booking requests. Please wait a few minutes before trying again." },
          { status: 429 }
        );
      }
      rateData.count += 1;
    } else {
      rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    }

    const body = await request.json();

    // Map `name` to `customerName` if submitted as `name`
    const payload = {
      ...body,
      customerName: body.customerName || body.name,
      partySize: typeof body.partySize === "string" ? parseInt(body.partySize, 10) : body.partySize,
    };

    const result = ReservationSchema.safeParse(payload);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.flatten() },
        { status: 400 }
      );
    }

    const { customerName, email, phone, partySize, date, timeSlot, specialNotes } = result.data;
    const bookingCode = `SKM-${Math.floor(100000 + Math.random() * 900000)}`;

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const reservationRecipient = process.env.CONTACT_EMAIL || "biluquick123@gmail.com";

    if (smtpHost && smtpUser && smtpPass) {
      const cleanPass = smtpPass.replace(/\s+/g, "");
      const isGmail = smtpHost === "smtp.gmail.com" || smtpUser.endsWith("@gmail.com");
      const transporter = isGmail
        ? nodemailer.createTransport({
            service: "gmail",
            auth: {
              user: smtpUser,
              pass: cleanPass,
            },
          })
        : nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: smtpPort === 465,
            auth: {
              user: smtpUser,
              pass: cleanPass,
            },
          });

      await transporter.sendMail({
        from: `"Sokem Reservations" <${smtpUser}>`,
        replyTo: email,
        to: reservationRecipient,
        subject: `[New Reservation: ${bookingCode}] ${customerName} • ${partySize} Guests • ${date} @ ${timeSlot}`,
        text: `New Table Reservation Received!\n\nReference: ${bookingCode}\nName: ${customerName}\nEmail: ${email}\nPhone: ${phone}\nParty Size: ${partySize} Guests\nDate & Time: ${date} at ${timeSlot}\nSpecial Notes: ${specialNotes || "None"}\n`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #0f172a; color: #f8fafc; border-radius: 12px; border: 1px solid #334155;">
            <div style="text-align: center; margin-bottom: 20px;">
              <h1 style="color: #f59e0b; margin: 0; font-size: 24px; letter-spacing: 1px;">SOKEM BAR & RESTAURANT</h1>
              <p style="color: #94a3b8; font-size: 13px; margin-top: 4px;">Table Reservation Notification</p>
            </div>
            
            <div style="background-color: #1e293b; padding: 16px 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">Booking Reference</p>
              <h2 style="margin: 4px 0 0 0; color: #f8fafc; font-size: 20px; font-family: monospace;">${bookingCode}</h2>
            </div>

            <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #334155;">
                <td style="padding: 10px 0; color: #94a3b8;">Guest Name</td>
                <td style="padding: 10px 0; font-weight: bold; color: #f8fafc; text-align: right;">${customerName}</td>
              </tr>
              <tr style="border-bottom: 1px solid #334155;">
                <td style="padding: 10px 0; color: #94a3b8;">Party Size</td>
                <td style="padding: 10px 0; font-weight: bold; color: #f59e0b; text-align: right;">${partySize} Guests</td>
              </tr>
              <tr style="border-bottom: 1px solid #334155;">
                <td style="padding: 10px 0; color: #94a3b8;">Date & Time</td>
                <td style="padding: 10px 0; font-weight: bold; color: #f8fafc; text-align: right;">${date} at ${timeSlot}</td>
              </tr>
              <tr style="border-bottom: 1px solid #334155;">
                <td style="padding: 10px 0; color: #94a3b8;">Phone Number</td>
                <td style="padding: 10px 0; font-weight: bold; color: #f8fafc; text-align: right;">
                  <a href="tel:${phone.replace(/\s+/g, "")}" style="color: #38bdf8; text-decoration: none;">${phone}</a>
                </td>
              </tr>
              <tr style="border-bottom: 1px solid #334155;">
                <td style="padding: 10px 0; color: #94a3b8;">Email Address</td>
                <td style="padding: 10px 0; font-weight: bold; color: #f8fafc; text-align: right;">
                  <a href="mailto:${email}" style="color: #38bdf8; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #94a3b8; vertical-align: top;">Special Requests</td>
                <td style="padding: 10px 0; color: #e2e8f0; text-align: right;">${specialNotes || "None provided"}</td>
              </tr>
            </table>

            <div style="text-align: center; border-top: 1px solid #334155; padding-top: 16px; font-size: 12px; color: #64748b;">
              <p style="margin: 0;">Sokem Bar & Restaurant • Legehar, Addis Ababa</p>
              <p style="margin: 4px 0 0 0;">Recipient: ${reservationRecipient}</p>
            </div>
          </div>
        `,
      });

      console.log(`[Reservation] Email notification sent successfully to ${reservationRecipient}`);
    } else {
      console.log("[Reservation] SMTP not configured. Simulated direct email dispatch:", {
        recipient: reservationRecipient,
        bookingCode,
        customerName,
        partySize,
        date,
        timeSlot,
        email,
        phone,
        specialNotes,
      });
    }

    return NextResponse.json({
      success: true,
      bookingCode,
      message: "Your reservation request has been submitted and confirmed.",
    });
  } catch (error) {
    console.error("[API Reservations] Error processing reservation:", error);
    return NextResponse.json(
      { error: "Failed to submit reservation. Please try again or call us directly." },
      { status: 500 }
    );
  }
}
