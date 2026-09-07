"use server";

import { redirect } from "next/navigation";
import { LoginSchema } from "@/lib/validators/auth";
import { authenticateCredentials } from "./user";
import { signSessionToken, setSessionCookie, deleteSessionCookie } from "./session";
import { getRoleDashboardPath } from "@/lib/rbac";
import { logAuditEvent } from "@/lib/audit";

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
 * Real Server Action for Login — works for both ADMIN and STAFF.
 * Authenticates against the database, sets an HTTP-only JWT session cookie,
 * then returns a role-based redirect path.
 */
export async function loginAction(
  param1: LoginActionResult | { email?: string; password?: string; callbackUrl?: string } | null,
  maybeFormData?: FormData
): Promise<LoginActionResult> {
  let rawEmail = "";
  let rawPassword = "";
  let callbackUrl = "";

  if (maybeFormData && typeof maybeFormData.get === "function") {
    rawEmail = (maybeFormData.get("email") as string) || "";
    rawPassword = (maybeFormData.get("password") as string) || "";
    callbackUrl = (maybeFormData.get("callbackUrl") as string) || "";
  } else if (param1 && typeof param1 === "object") {
    const creds = param1 as { email?: string; password?: string; callbackUrl?: string };
    rawEmail = creds.email || "";
    rawPassword = creds.password || "";
    callbackUrl = creds.callbackUrl || "";
  }

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

  // Real credential authentication with bcrypt hash verification against DB
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

  // Log the login event
  await logAuditEvent(sessionUser.userId, "LOGIN", "Session", undefined, {
    email: sessionUser.email,
    role: sessionUser.role,
  });

  // Determine redirect: honor callbackUrl only if it matches the user's allowed area
  const roleDashboard = getRoleDashboardPath(sessionUser.role);
  let targetPath = roleDashboard;

  if (callbackUrl) {
    const isAdminCallback = callbackUrl.startsWith("/admin");
    const isStaffCallback = callbackUrl.startsWith("/staff");
    if (sessionUser.role === "ADMIN" && (isAdminCallback || isStaffCallback)) {
      targetPath = callbackUrl;
    } else if (sessionUser.role === "STAFF" && isStaffCallback) {
      targetPath = callbackUrl;
    }
  }

  return {
    success: true,
    redirectTo: targetPath,
  };
}

/**
 * Server Action for Logout
 */
export async function logoutAction(): Promise<void> {
  await deleteSessionCookie();
  redirect("/sign-in");
}
