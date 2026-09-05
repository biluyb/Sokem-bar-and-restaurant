import { describe, it, expect } from "vitest";
import { hashPassword, verifyPassword } from "./password";
import { signSessionToken, verifySessionToken } from "./session";
import { AuthSessionPayload } from "@/lib/validators/auth";

describe("Password and Session Crypto", () => {
  it("hashes password and verifies successfully with bcrypt", async () => {
    const raw = "SuperSecretPassword2026!";
    const hashed = await hashPassword(raw);

    expect(hashed).not.toBe(raw);
    expect(hashed.startsWith("$2")).toBe(true);

    const match = await verifyPassword(raw, hashed);
    expect(match).toBe(true);

    const wrongMatch = await verifyPassword("WrongPassword!", hashed);
    expect(wrongMatch).toBe(false);
  });

  it("signs and verifies JWT session token using jose", async () => {
    const samplePayload: AuthSessionPayload = {
      userId: "usr_test_123",
      email: "director@sokem.com",
      name: "Sokem Director",
      role: "SUPER_ADMIN",
    };

    const token = await signSessionToken(samplePayload);
    expect(typeof token).toBe("string");
    expect(token.split(".").length).toBe(3);

    const decoded = await verifySessionToken(token);
    expect(decoded).not.toBeNull();
    expect(decoded?.userId).toBe(samplePayload.userId);
    expect(decoded?.email).toBe(samplePayload.email);
    expect(decoded?.role).toBe("SUPER_ADMIN");
  });

  it("returns null for tampered or invalid JWT session tokens", async () => {
    const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.tampered.signature";
    const result = await verifySessionToken(invalidToken);
    expect(result).toBeNull();
  });
});
