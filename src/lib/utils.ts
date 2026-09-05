import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(amount: number | string, currency: string = "USD") {
  const numeric = typeof amount === "string" ? parseFloat(amount) : amount;
  if (isNaN(numeric)) return `${currency} --`;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
  }).format(numeric);
}
