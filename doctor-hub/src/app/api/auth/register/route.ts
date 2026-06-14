import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashPassword, generateToken } from "@/lib/auth";
import { registerSchema } from "@/lib/validators";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = registerSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (existingUser) {
      return NextResponse.json({ error: "User already exists with this email" }, { status: 400 });
    }

    const hashedPassword = hashPassword(validated.password);

    const user = await db.user.create({
      data: {
        name: validated.name,
        email: validated.email,
        password: hashedPassword,
        phone: validated.phone,
        role: validated.role,
        isActive: true,
      },
    });

    // Create corresponding subtype record
    if (validated.role === "PATIENT") {
      await db.patient.create({
        data: {
          userId: user.id,
        },
      });
    } else if (validated.role === "DOCTOR") {
      await db.doctor.create({
        data: {
          userId: user.id,
          specialization: "General Medicine",
          licenseNumber: `TEMP-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          experience: 0,
          consultationFee: 0.00,
          treatmentType: "ALLOPATHIC",
          qualifications: [],
        },
      });
    }

    const token = generateToken(user.id, user.role);

    const response = NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      }
    });

    response.cookies.set({
      name: "doctor-hub-token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      sameSite: "lax",
    });

    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.issues[0].message }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
