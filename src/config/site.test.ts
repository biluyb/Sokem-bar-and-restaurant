import { describe, it, expect } from "vitest";
import { SOKEM_CONFIG } from "./site";

describe("Site Configuration Integrity (src/config/site.ts)", () => {
  it("should have correct business name and branding", () => {
    expect(SOKEM_CONFIG.name).toBe("Sokem Bar & Restaurant");
    expect(SOKEM_CONFIG.tagline).toBeDefined();
    expect(SOKEM_CONFIG.description.length).toBeGreaterThan(10);
  });

  it("should have the verified phone number set", () => {
    expect(SOKEM_CONFIG.phone).toBe("093 001 4033");
  });

  it("should have the verified Google Maps URL set", () => {
    expect(SOKEM_CONFIG.mapUrl).toBe("https://maps.app.goo.gl/MJnT1GHeW1mSMDQr5");
  });

  it("should have the verified contact email set", () => {
    expect(SOKEM_CONFIG.email).toBe("biluquick123@gmail.com");
  });

  it("should contain all required public navigation routes", () => {
    const expectedHrefs = ["/", "/menu", "/reservations", "/events", "/gallery", "/contact"];
    const actualHrefs = SOKEM_CONFIG.navLinks.map((link) => link.href);
    expectedHrefs.forEach((href) => {
      expect(actualHrefs).toContain(href);
    });
  });

  it("should define operating hours structure", () => {
    expect(SOKEM_CONFIG.hours.weekday).toBeDefined();
    expect(SOKEM_CONFIG.hours.weekend).toBeDefined();
    expect(SOKEM_CONFIG.hours.sunday).toBeDefined();
    expect(SOKEM_CONFIG.hours.schedule).toHaveLength(7);
  });
});
