import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { AuthSessionPayload } from "@/lib/validators/auth";

const SESSION_COOKIE_NAME = "sokem_admin_session";

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET || "fallback-secret-sokem-restaurant-admin-key-2026-auth";
  return new TextEncoder().encode(secret);
}

async function getSessionPayload(request: NextRequest): Promise<AuthSessionPayload | null> {
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (!sessionCookie) return null;

  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(sessionCookie, secretKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as AuthSessionPayload;
  } catch {
    return null;
  }
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSessionPayload(request);
  const isAuthenticated = session !== null;

  // ── /sign-in — redirect authenticated users to their dashboard ────────
  if (pathname === "/sign-in") {
    if (isAuthenticated) {
      const dest = session.role === "ADMIN" ? "/admin/dashboard" : "/staff/dashboard";
      return NextResponse.redirect(new URL(dest, request.url));
    }
    return NextResponse.next();
  }

  // ── Legacy /admin/login — redirect to /sign-in ────────────────────────
  if (pathname === "/admin/login") {
    const signInUrl = new URL("/sign-in", request.url);
    const callbackUrl = request.nextUrl.searchParams.get("callbackUrl");
    if (callbackUrl) signInUrl.searchParams.set("callbackUrl", callbackUrl);
    return NextResponse.redirect(signInUrl);
  }

  // ── /admin/* — requires authentication + ADMIN role ───────────────────
  if (pathname.startsWith("/admin")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/sign-in", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
    // STAFF cannot access /admin routes
    if (session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/staff/dashboard", request.url));
    }
    return NextResponse.next();
  }

  // ── /staff/* — requires authentication ───────────────────────────────
  if (pathname.startsWith("/staff")) {
    if (!isAuthenticated) {
      const loginUrl = new URL("/sign-in", request.url);
      loginUrl.searchParams.set("callbackUrl", pathname + request.nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/sign-in", "/admin/:path*", "/staff/:path*", "/admin/login"],
};
