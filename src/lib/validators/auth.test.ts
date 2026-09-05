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

  it("rejects empty email", () => {
    const invalidData = {
      email: "",
      password: "password123",
    };
    const result = LoginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects invalid email formats", () => {
    const invalidData = {
      email: "not-an-email",
      password: "password123",
    };
    const result = LoginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });

  it("rejects passwords shorter than 6 characters", () => {
    const invalidData = {
      email: "admin@sokem.com",
      password: "123",
    };
    const result = LoginSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
