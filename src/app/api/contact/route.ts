import { NextRequest, NextResponse } from "next/server";
import { transporter, mailOptions } from "@/lib/mail";

export async function POST(request: NextRequest) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    console.log("🚀 Sending email:", { name, email, message });

    const result = await transporter.sendMail({
      ...mailOptions,
      subject: `New message from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    console.log("✅ Email sent:", result);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("💥 Email send error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send email";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
