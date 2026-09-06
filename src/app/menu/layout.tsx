import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Food & Cocktail Menu",
  description:
    "Explore our culinary creations, dry-aged prime steaks, fresh seafood, and handcrafted artisan cocktails at Sokem Bar & Restaurant in Addis Ababa.",
};

export default function MenuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
