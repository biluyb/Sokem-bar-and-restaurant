import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Table & Reservations",
  description:
    "Reserve your table online at Sokem Bar & Restaurant. Enjoy seamless dining bookings in Addis Ababa with instant confirmation.",
};

export default function ReservationsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
