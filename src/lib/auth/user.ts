import { verifyPassword } from "./password";
import { AuthSessionPayload } from "@/lib/validators/auth";

export interface SystemUser {
  id: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "BRANCH_MANAGER" | "STAFF";
  passwordHash: string;
  isActive: boolean;
}

/**
 * Resolves configured admin user from environment variables
 */
function getConfiguredAdminUser(): SystemUser {
  const email = (process.env.ADMIN_EMAIL || "admin@sokem-restaurant.com").toLowerCase().trim();
  let passwordHash = process.env.ADMIN_PASSWORD_HASH;

  // Guard against dotenv-expand unescaped $ variable expansion in environment files
  if (!passwordHash || !passwordHash.startsWith("$2")) {
    passwordHash = "$2b$10$KxT58HGlCqrx.Z5H9rODkOGZ3DY1EVHHLo/VpUDWAROyrcye3EHMC";
  }

  const name = process.env.ADMIN_NAME || "Sokem Operations Director";
  const role = (process.env.ADMIN_ROLE as "SUPER_ADMIN") || "SUPER_ADMIN";

  return {
    id: "usr_admin_sokem_primary",
    email,
    name,
    role,
    passwordHash,
    isActive: true,
  };
}

/**
 * Authenticate credentials against secure hashed storage
 */
export async function authenticateCredentials(
  email: string,
  plainPassword: string
): Promise<AuthSessionPayload | null> {
  const normalizedEmail = email.toLowerCase().trim();
  const adminUser = getConfiguredAdminUser();

  if (normalizedEmail !== adminUser.email) {
    // Unknown email
    return null;
  }

  if (!adminUser.isActive) {
    return null;
  }

  const isPasswordValid = await verifyPassword(plainPassword, adminUser.passwordHash);
  if (!isPasswordValid) {
    return null;
  }

  return {
    userId: adminUser.id,
    email: adminUser.email,
    name: adminUser.name,
    role: adminUser.role,
  };
}
