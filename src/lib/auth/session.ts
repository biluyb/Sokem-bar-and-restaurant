import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { AuthSessionPayload } from "@/lib/validators/auth";

export const SESSION_COOKIE_NAME = "sokem_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24; // 24 hours

function getSecretKey(): Uint8Array {
  const secret = process.env.AUTH_SECRET || "fallback-secret-sokem-restaurant-admin-key-2026-auth";
  return new TextEncoder().encode(secret);
}

/**
 * Encrypt and sign a JWT session token using jose (Edge-compatible)
 */
export async function signSessionToken(payload: AuthSessionPayload): Promise<string> {
  const secretKey = getSecretKey();
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(secretKey);
}

/**
 * Verify and decode a JWT session token using jose (Edge-compatible)
 */
export async function verifySessionToken(token: string): Promise<AuthSessionPayload | null> {
  try {
    const secretKey = getSecretKey();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ["HS256"],
    });
    return payload as unknown as AuthSessionPayload;
  } catch (err) {
    return null;
  }
}

/**
 * Set the session cookie in HTTP-only, secure mode
 */
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

/**
 * Remove the session cookie upon logout
 */
export async function deleteSessionCookie(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/**
 * Retrieve and verify the current session from incoming cookies (Server Component / Action)
 */
export async function getCurrentSession(): Promise<AuthSessionPayload | null> {
  const cookieStore = cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return null;
  return await verifySessionToken(token);
}
