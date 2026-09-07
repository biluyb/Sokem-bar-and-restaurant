/**
 * Audit Log Helper
 * Records important administrative actions for security auditing.
 * Never logs passwords, tokens, or sensitive credentials.
 */

import { prisma } from "@/db/client";

export type AuditAction =
  | "LOGIN"
  | "LOGOUT"
  | "CREATE"
  | "UPDATE"
  | "DELETE"
  | "TOGGLE"
  | "DISABLE"
  | "ENABLE";

export type AuditResourceType =
  | "MenuItem"
  | "MenuCategory"
  | "GalleryItem"
  | "RestaurantEvent"
  | "SiteContent"
  | "User"
  | "Session";

export interface AuditMetadata {
  [key: string]: string | number | boolean | null | undefined;
}

export async function logAuditEvent(
  userId: string,
  action: AuditAction,
  resourceType: AuditResourceType,
  resourceId?: string,
  metadata?: AuditMetadata
): Promise<void> {
  try {
    // Strip any potentially sensitive keys before persisting
    const safeMetadata = metadata
      ? Object.fromEntries(
          Object.entries(metadata).filter(
            ([key]) =>
              !["password", "passwordHash", "token", "secret", "apiKey"].includes(
                key.toLowerCase()
              )
          )
        )
      : null;

    await prisma.auditLog.create({
      data: {
        userId,
        action,
        resourceType,
        resourceId: resourceId ?? null,
        metadata: safeMetadata ? JSON.stringify(safeMetadata) : null,
      },
    });
  } catch (err) {
    // Audit log failure must never break core application flow
    console.error("[AuditLog] Failed to write audit entry:", err);
  }
}
