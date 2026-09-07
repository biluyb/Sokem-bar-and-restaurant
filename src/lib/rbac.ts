/**
 * RBAC Permission Helpers
 *
 * All permission checks for server-side authorization.
 * Never rely on client-side role checks for security.
 */

import { UserRole, AuthSessionPayload } from "@/lib/validators/auth";

// ─────────────────────────────────────────────────────────────────
// Role Hierarchy
// ADMIN > STAFF
// ─────────────────────────────────────────────────────────────────

export function isAdmin(session: AuthSessionPayload | null | undefined): session is AuthSessionPayload & { role: "ADMIN" } {
  return session?.role === "ADMIN";
}

export function isStaff(session: AuthSessionPayload | null | undefined): session is AuthSessionPayload {
  return session?.role === "STAFF" || session?.role === "ADMIN";
}

export function isAuthenticated(session: AuthSessionPayload | null | undefined): session is AuthSessionPayload {
  return session !== null && session !== undefined;
}

// ─────────────────────────────────────────────────────────────────
// Content Management Permissions
// Both ADMIN and STAFF can manage website content
// ─────────────────────────────────────────────────────────────────

export function canManageMenu(session: AuthSessionPayload | null): boolean {
  return isStaff(session);
}

export function canManageGallery(session: AuthSessionPayload | null): boolean {
  return isStaff(session);
}

export function canManageEvents(session: AuthSessionPayload | null): boolean {
  return isStaff(session);
}

export function canManageSiteContent(session: AuthSessionPayload | null): boolean {
  return isStaff(session);
}

// ─────────────────────────────────────────────────────────────────
// User Management Permissions — ADMIN ONLY
// ─────────────────────────────────────────────────────────────────

export function canManageUsers(session: AuthSessionPayload | null): boolean {
  return isAdmin(session);
}

export function canCreateUser(session: AuthSessionPayload | null): boolean {
  return isAdmin(session);
}

export function canDeleteUser(session: AuthSessionPayload | null): boolean {
  return isAdmin(session);
}

export function canChangeUserRole(session: AuthSessionPayload | null): boolean {
  return isAdmin(session);
}

// ─────────────────────────────────────────────────────────────────
// Response helpers for API routes
// ─────────────────────────────────────────────────────────────────

export function unauthorizedResponse(message = "Authentication required"): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 401,
    headers: { "Content-Type": "application/json" },
  });
}

export function forbiddenResponse(message = "Insufficient permissions"): Response {
  return new Response(JSON.stringify({ error: message }), {
    status: 403,
    headers: { "Content-Type": "application/json" },
  });
}

export function getRoleDashboardPath(role: UserRole): string {
  switch (role) {
    case "ADMIN":
      return "/admin/dashboard";
    case "STAFF":
      return "/staff/dashboard";
    default:
      return "/sign-in";
  }
}
