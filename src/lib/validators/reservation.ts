import { z } from "zod";

export const ReservationSchema = z.object({
  customerName: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  phone: z
    .string({ required_error: "Phone number is required" })
    .min(7, "Phone number must be at least 7 digits"),
  partySize: z
    .number({ required_error: "Party size is required" })
    .min(1, "Party size must be at least 1")
    .max(20, "For parties larger than 20, please contact our events desk directly"),
  date: z
    .string({ required_error: "Date is required" })
    .min(1, "Please select a reservation date"),
  timeSlot: z
    .string({ required_error: "Time slot is required" })
    .min(1, "Please select a time slot"),
  specialNotes: z.string().optional(),
});

export type ReservationInput = z.infer<typeof ReservationSchema>;
