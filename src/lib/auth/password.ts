import bcrypt from "bcryptjs";

const SALT_ROUNDS = 10;

/**
 * Compare plain text password with a bcrypt hash in constant time
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  if (!password || !hash) return false;
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    console.error("Password verification error:", error);
    return false;
  }
}

/**
 * Hash a password using bcrypt with standard salt rounds
 */
export async function hashPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, SALT_ROUNDS);
}
