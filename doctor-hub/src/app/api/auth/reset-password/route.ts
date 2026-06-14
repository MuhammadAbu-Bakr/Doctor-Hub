import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, comparePassword } from "@/lib/auth";
import { resetPasswordSchema } from "@/lib/validators";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = resetPasswordSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (!user || !user.otpHash || !user.otpExpires) {
      return NextResponse.json({ error: "Invalid request or OTP" }, { status: 400 });
    }

    // Check expiry
    if (new Date() > user.otpExpires) {
      return NextResponse.json({ error: "OTP has expired" }, { status: 400 });
    }

    // Check OTP validity
    const isOtpMatch = comparePassword(validated.otp, user.otpHash);
    if (!isOtpMatch) {
      return NextResponse.json({ error: "Invalid OTP code" }, { status: 400 });
    }

    const hashedNewPassword = hashPassword(validated.newPassword);

    await db.user.update({
      where: { id: user.id },
      data: {
        password: hashedNewPassword,
        otpHash: null,
        otpExpires: null,
      },
    });

    return NextResponse.json({ success: true, message: "Password updated successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
