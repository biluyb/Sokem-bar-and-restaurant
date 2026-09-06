import { describe, it, expect } from "vitest";
import { signSessionToken } from "./session";
import { AuthSessionPayload } from "@/lib/validators/auth";
import { SOKEM_CONFIG } from "@/config/site";

describe("Admin Route Navigation & Config", () => {
  it("defines all four required administrative routes in SOKEM_CONFIG", () => {
    const labels = SOKEM_CONFIG.adminNavLinks.map((l) => l.label);
    const hrefs = SOKEM_CONFIG.adminNavLinks.map((l) => l.href);

    expect(labels).toContain("Overview");
    expect(labels).toContain("Menu Manager");
    expect(labels).toContain("Reservations");
    expect(labels).toContain("Events");

    expect(hrefs).toContain("/admin/dashboard");
    expect(hrefs).toContain("/admin/menu");
    expect(hrefs).toContain("/admin/reservations");
    expect(hrefs).toContain("/admin/events");
  });

  it("successfully signs administrative session token for role-based access", async () => {
    const adminUser: AuthSessionPayload = {
      userId: "usr_admin_test",
      email: "admin@sokem-restaurant.com",
      name: "Sokem Operations Director",
      role: "SUPER_ADMIN",
    };

    const token = await signSessionToken(adminUser);
    expect(typeof token).toBe("string");
    expect(token.length).toBeGreaterThan(20);
  });
});
