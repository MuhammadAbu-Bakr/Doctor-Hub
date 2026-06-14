import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "doctor-hub-super-secret-key-123456";

interface DecodedToken {
  userId: string;
  role: string;
  exp?: number;
}

// Edge-compatible JWT verification helper using Web Crypto API
async function verifyJwtEdge(token: string, secret: string): Promise<DecodedToken | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [headerB64, payloadB64, signatureB64] = parts;

    const encoder = new TextEncoder();
    const data = encoder.encode(`${headerB64}.${payloadB64}`);

    const base64UrlDecode = (str: string) => {
      let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
      while (base64.length % 4) base64 += "=";
      return atob(base64);
    };

    const secretBuffer = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      "raw",
      secretBuffer,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["verify"]
    );

    const sigStr = base64UrlDecode(signatureB64);
    const sigBuffer = new Uint8Array(sigStr.length);
    for (let i = 0; i < sigStr.length; i++) {
      sigBuffer[i] = sigStr.charCodeAt(i);
    }

    const isValid = await crypto.subtle.verify("HMAC", key, sigBuffer, data);
    if (!isValid) return null;

    const payloadStr = base64UrlDecode(payloadB64);
    const payload = JSON.parse(payloadStr);

    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const tokenCookie = request.cookies.get("doctor-hub-token");
  const token = tokenCookie?.value;

  const payload = token ? await verifyJwtEdge(token, JWT_SECRET) : null;
  const isAuthenticated = !!payload;

  const isAuthRoute = pathname.startsWith("/login") || pathname.startsWith("/register") || pathname.startsWith("/forgot-password");
  const isDashboardRoute = pathname.startsWith("/dashboard");
  const isApiRoute = pathname.startsWith("/api");
  const isApiAuthRoute = pathname.startsWith("/api/auth");

  // 1. Protect all /dashboard/* routes
  if (isDashboardRoute && !isAuthenticated) {
    const url = new URL("/login", request.url);
    url.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(url);
  }

  // 2. Protect all /api/* routes except /api/auth/*
  if (isApiRoute && !isApiAuthRoute && !isAuthenticated) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 3. Redirect authenticated users away from /login, /register, and /forgot-password
  if (isAuthRoute && isAuthenticated) {
    let dashboardPath = "/dashboard/patient"; // Default fallback
    if (payload.role === "DOCTOR") dashboardPath = "/dashboard/doctor";
    else if (payload.role === "ASSISTANT") dashboardPath = "/dashboard/assistant";
    else if (payload.role === "ADMIN") dashboardPath = "/dashboard/admin";
    else if (payload.role === "SUPER_ADMIN") dashboardPath = "/dashboard/super-admin";
    
    return NextResponse.redirect(new URL(dashboardPath, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/login",
    "/register",
    "/forgot-password"
  ]
};
