import { describe, it, expect } from "vitest";
import { LoginSchema } from "./auth";

describe("LoginSchema Validator", () => {
  it("validates correct email and password", () => {
    const validData = {
      email: "Admin@Sokem-Restaurant.com",
      password: "StrongPassword123!",
    };
    const result = LoginSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("admin@sokem-restaurant.com");
      expect(result.data.password).toBe("StrongPassword123!");
    }
  });

  it("validates username format like Admin", () => {
    const validData = {
      email: "Admin",
      password: "Admin@111",
    };
    const result = LoginSchema.safeParse(validData);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.email).toBe("admin");
      expect(result.data.password).toBe("Admin@111");
    }
  });

  it("rejects empty username or email", () => {
    const invalidData = {
      email: "",
      password: "password123",
    };
    const result = LoginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects empty password", () => {
    const invalidData = {
      email: "Admin",
      password: "",
    };
    const result = LoginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
