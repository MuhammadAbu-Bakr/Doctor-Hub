import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { comparePassword, generateToken } from "@/lib/auth";
import { loginSchema } from "@/lib/validators";
import * as z from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validated = loginSchema.parse(body);

    const user = await db.user.findUnique({
      where: { email: validated.email },
    });

    if (!user || !user.password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    if (!user.isActive) {
      return NextResponse.json({ error: "Account is deactivated" }, { status: 403 });
    }

    const isMatch = comparePassword(validated.password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
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
