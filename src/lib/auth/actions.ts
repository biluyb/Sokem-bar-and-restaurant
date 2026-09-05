"use server";

import { redirect } from "next/navigation";
import { LoginSchema } from "@/lib/validators/auth";
import { authenticateCredentials } from "./user";
import { signSessionToken, setSessionCookie, deleteSessionCookie } from "./session";

export interface LoginActionResult {
  success: boolean;
  error?: string;
  redirectTo?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
}

/**
 * Real Server Action for Admin Login
 */
export async function loginAction(
  prevState: LoginActionResult | null,
  formData: FormData
): Promise<LoginActionResult> {
  const rawEmail = formData.get("email");
  const rawPassword = formData.get("password");
  const callbackUrl = (formData.get("callbackUrl") as string) || "/admin/dashboard";

  const validated = LoginSchema.safeParse({
    email: rawEmail,
    password: rawPassword,
  });

  if (!validated.success) {
    return {
      success: false,
      fieldErrors: validated.error.flatten().fieldErrors,
      error: "Please correct the errors in the form.",
    };
  }

  const { email, password } = validated.data;

  // Real credential authentication with bcrypt hash verification
  const sessionUser = await authenticateCredentials(email, password);

  if (!sessionUser) {
    return {
      success: false,
      error: "Invalid email or password. Please verify your credentials.",
    };
  }

  // Sign JWT session token and set HTTP-only cookie
  const token = await signSessionToken(sessionUser);
  await setSessionCookie(token);

  // Safely return redirect target path
  const targetPath = callbackUrl.startsWith("/admin") ? callbackUrl : "/admin/dashboard";
  return {
    success: true,
    redirectTo: targetPath,
  };
}

/**
 * Real Server Action for Admin Logout
 */
export async function logoutAction(): Promise<void> {
  await deleteSessionCookie();
  redirect("/admin/login");
}
