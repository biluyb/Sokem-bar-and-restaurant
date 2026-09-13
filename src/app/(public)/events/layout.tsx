import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Live Events & Special Nights",
  description:
    "Join us for live jazz, Cand Night, DJ performances, and signature gatherings at Sokem Bar & Restaurant in Addis Ababa.",
};

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
