import { describe, it, expect } from "vitest";
import { ReservationSchema } from "./reservation";

describe("ReservationSchema Zod Validator", () => {
  const validReservation = {
    customerName: "Eleanor Vance",
    email: "eleanor@example.com",
    phone: "093 001 4033",
    partySize: 4,
    date: "2026-09-15",
    timeSlot: "7:00 PM",
    specialNotes: "Anniversary table near window",
  };

  it("should validate a correct reservation payload", () => {
    const result = ReservationSchema.safeParse(validReservation);
    expect(result.success).toBe(true);
  });

  it("should reject when customerName is under 2 characters", () => {
    const result = ReservationSchema.safeParse({
      ...validReservation,
      customerName: "E",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("at least 2 characters");
    }
  });

  it("should reject an invalid email address", () => {
    const result = ReservationSchema.safeParse({
      ...validReservation,
      email: "not-an-email",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("Invalid email");
    }
  });

  it("should reject a party size under 1", () => {
    const result = ReservationSchema.safeParse({
      ...validReservation,
      partySize: 0,
    });
    expect(result.success).toBe(false);
  });

  it("should reject a party size over 20", () => {
    const result = ReservationSchema.safeParse({
      ...validReservation,
      partySize: 25,
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain("parties larger than 20");
    }
  });

  it("should reject missing required date or timeSlot", () => {
    const result = ReservationSchema.safeParse({
      ...validReservation,
      date: "",
      timeSlot: "",
    });
    expect(result.success).toBe(false);
  });

  it("should accept payloads without optional specialNotes", () => {
    const { specialNotes, ...withoutNotes } = validReservation;
    const result = ReservationSchema.safeParse(withoutNotes);
    expect(result.success).toBe(true);
  });
});
