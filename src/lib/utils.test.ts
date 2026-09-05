import { describe, it, expect } from "vitest";
import { cn, formatPrice } from "./utils";

describe("Utility Functions (src/lib/utils.ts)", () => {
  describe("cn (classnames merge)", () => {
    it("should merge conditional class names correctly", () => {
      const result = cn("text-base", true && "text-gold", false && "hidden");
      expect(result).toBe("text-base text-gold");
    });

    it("should resolve conflicting Tailwind utility classes", () => {
      const result = cn("p-4", "p-8");
      expect(result).toBe("p-8");
    });

    it("should handle undefined and null inputs cleanly", () => {
      const result = cn("rounded-lg", undefined, null, "bg-obsidian");
      expect(result).toBe("rounded-lg bg-obsidian");
    });
  });

  describe("formatPrice", () => {
    it("should format numeric amounts into standard USD currency strings", () => {
      expect(formatPrice(26, "USD")).toBe("$26.00");
      expect(formatPrice(48.5, "USD")).toBe("$48.50");
    });

    it("should handle string numbers", () => {
      expect(formatPrice("32", "USD")).toBe("$32.00");
    });

    it("should return fallback for invalid numbers", () => {
      expect(formatPrice("invalid", "USD")).toBe("USD --");
    });
  });
});
