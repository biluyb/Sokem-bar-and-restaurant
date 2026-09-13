import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Location & Contact",
  description:
    "Find Sokem Bar & Restaurant in Legehar, Addis Ababa. Contact our concierge team for private events, large group seatings, and directions.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
