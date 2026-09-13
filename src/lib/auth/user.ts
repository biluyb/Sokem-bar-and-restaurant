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

  // Emergency fallback helper using environment hashes (for bootstrap or offline DB)
  const checkMasterFallback = async (): Promise<AuthSessionPayload | null> => {
    const adminEmail = (process.env.ADMIN_EMAIL || "admin@sokem-restaurant.com").toLowerCase().trim();
    const staffEmail = (process.env.STAFF_EMAIL || "staff@sokem-restaurant.com").toLowerCase().trim();

    // In test environment, provide default test hash if not provided
    const defaultTestHash = "$2b$10$KxT58HGlCqrx.Z5H9rODkOGZ3DY1EVHHLo/VpUDWAROyrcye3EHMC";
    const adminHash = (process.env.ADMIN_PASSWORD_HASH || (process.env.NODE_ENV === "test" ? defaultTestHash : ""))?.replace(/\\/g, "");
    const staffHash = process.env.STAFF_PASSWORD_HASH?.replace(/\\/g, "");

    if (normalized === "admin" || normalized === "administrator" || normalizedEmail === adminEmail) {
      if (adminHash) {
        const isMatch = await verifyPassword(plainPassword, adminHash);
        if (isMatch) {
          return {
            userId: "admin-sokem-master",
            email: adminEmail,
            name: process.env.ADMIN_NAME || "Admin",
            role: "ADMIN" as const,
          };
        }
      }
    }

    if (normalized === "staff" || normalizedEmail === staffEmail) {
      if (staffHash) {
        const isMatch = await verifyPassword(plainPassword, staffHash);
        if (isMatch) {
          return {
            userId: "staff-sokem-master",
            email: staffEmail,
            name: process.env.STAFF_NAME || "Staff Member",
            role: "STAFF" as const,
          };
        }
      }
    }

    return null;
  };

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
    // Allow master credentials even if database connection is disrupted
    return await checkMasterFallback();
  }

  if (!user || !user.isActive) {
    const fallback = await checkMasterFallback();
    if (fallback) return fallback;

    // Perform a dummy hash comparison to prevent timing attacks that
    // would allow an attacker to enumerate valid email addresses.
    await verifyPassword(plainPassword, "$2b$10$invalidhashpadding000000000000000000000000000000000");
    return null;
  }

  const isPasswordValid = await verifyPassword(plainPassword, user.passwordHash);
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
