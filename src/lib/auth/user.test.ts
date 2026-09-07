import { describe, it, expect } from "vitest";
import { authenticateCredentials } from "./user";

describe("authenticateCredentials Service", () => {
  it("authenticates configured admin with valid password", async () => {
    const user = await authenticateCredentials("admin@sokem-restaurant.com", "SokemAdmin2026!");
    expect(user).not.toBeNull();
    expect(user?.email).toBe("admin@sokem-restaurant.com");
    expect(user?.role).toBe("ADMIN");
  });

  it("rejects valid email with wrong password", async () => {
    const user = await authenticateCredentials("admin@sokem-restaurant.com", "WrongPassword123");
    expect(user).toBeNull();
  });

  it("rejects unknown email", async () => {
    const user = await authenticateCredentials("unknown@random.com", "SokemAdmin2026!");
    expect(user).toBeNull();
  });

  it("handles case-insensitive and trimmed email correctly", async () => {
    const user = await authenticateCredentials("  ADMIN@Sokem-Restaurant.COM  ", "SokemAdmin2026!");
    expect(user).not.toBeNull();
    expect(user?.email).toBe("admin@sokem-restaurant.com");
  });
});
