import { z } from "zod";

export const LoginSchema = z.object({
  email: z
    .string()
    .min(1, "Username or email is required")
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, "Password is required")
    .max(100, "Password is too long"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

export const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name is too long")
    .trim(),
  email: z
    .string()
    .email("Please provide a valid email address")
    .max(200, "Email is too long")
    .trim()
    .toLowerCase(),
  subject: z
    .string()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject is too long")
    .trim(),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message is too long (maximum 3000 characters)")
    .trim(),
});

export type ContactFormInput = z.infer<typeof ContactFormSchema>;

// Roles aligned with Prisma UserRole enum
export type UserRole = "ADMIN" | "STAFF";

export interface AuthSessionPayload {
  userId: string;
  email: string;
  name: string;
  role: UserRole;
  iat?: number;
  exp?: number;
}
