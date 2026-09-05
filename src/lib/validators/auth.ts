import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email address is required")
    .email("Please provide a valid email address")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export interface AuthSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: "SUPER_ADMIN" | "BRANCH_MANAGER" | "STAFF";
  iat?: number;
  exp?: number;
}
