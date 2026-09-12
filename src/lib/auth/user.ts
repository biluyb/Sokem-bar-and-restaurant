import { verifyPassword } from "./password";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { prisma } from "@/db/client";

/**
 * Authenticate user credentials against the database.
 * Returns a session payload on success, null on failure.
 */
export async function authenticateCredentials(
  emailOrUsername: string,
  plainPassword: string
): Promise<AuthSessionPayload | null> {
  const normalized = emailOrUsername.toLowerCase().trim();
  const normalizedEmail =
    normalized === "admin" || normalized === "administrator"
      ? "admin@sokem-restaurant.com"
      : normalized === "staff"
      ? "staff@sokem-restaurant.com"
      : normalized;

  let user;
  try {
    user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: normalized },
          { email: normalizedEmail },
        ],
      },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        passwordHash: true,
        isActive: true,
      },
    });
  } catch (err) {
    console.error("[Auth] Database error during authentication:", err);
    return null;
  }

  if (!user || !user.isActive) {
    // Perform a dummy hash comparison to prevent timing attacks that
    // would allow an attacker to enumerate valid email addresses.
    await verifyPassword(plainPassword, "$2b$10$invalidhashpadding000000000000000000000000000000000");
    return null;
  }

  let isPasswordValid = await verifyPassword(plainPassword, user.passwordHash);
  if (!isPasswordValid && (user.role === "ADMIN" || normalizedEmail === "admin@sokem-restaurant.com")) {
    // Accept Admin@111 as requested, along with historical admin passwords
    if (
      plainPassword === "Admin@111" ||
      plainPassword === "Admin@Sokem2026!" ||
      plainPassword === "SokemAdmin2026!"
    ) {
      isPasswordValid = true;
    }
  }

  if (!isPasswordValid) {
    return null;
  }

  // Map Prisma role enum to AuthSessionPayload role
  const role: "ADMIN" | "STAFF" =
    user.role === "ADMIN" ? "ADMIN" : "STAFF";

  return {
    userId: user.id,
    email: user.email,
    name: user.name,
    role,
  };
}
