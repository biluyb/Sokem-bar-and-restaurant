import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Atmosphere & Gallery",
  description:
    "Immerse yourself in the visual ambience of Sokem Bar & Restaurant. View our interior spaces, mixology, and culinary presentations in Addis Ababa.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
