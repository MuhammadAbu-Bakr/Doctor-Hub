import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { forgotPasswordSchema } from "@/lib/validators";
import { Resend } from "resend";
import * as z from "zod";

const resend = new Resend(process.env.RESEND_API_KEY || "re_mock_key");

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = forgotPasswordSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (!user) {
      // Return 200 success to avoid email harvesting/enumeration
      return NextResponse.json({ success: true, message: "If the email exists, an OTP has been sent." });
    }

    // Generate a 6-digit numerical OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpHash = hashPassword(otp);
    const otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins expiry

    await db.user.update({
      where: { id: user.id },
      data: {
        otpHash,
        otpExpires,
      },
    });

    console.log(`[DEV OTP MOCK] Reset OTP for ${validated.email} is: ${otp}`);

    // If Resend API Key is configured and not the mock default
    if (process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_mock_key") {
      await resend.emails.send({
        from: "Doctor Hub <onboarding@resend.dev>",
        to: validated.email,
        subject: "Doctor Hub - Password Reset OTP",
        html: `<p>You requested a password reset. Your OTP is: <strong>${otp}</strong>. It will expire in 15 minutes.</p>`,
      });
    }

    return NextResponse.json({ success: true, message: "If the email exists, an OTP has been sent." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
