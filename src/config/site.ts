/**
 * Sokem Bar & Restaurant - Central Site Configuration
 * 
 * IMPORTANT: In accordance with AGENTS.md Rule 25:
 * NEVER invent real business details. All business information that has not yet been
 * provided is defined here as explicit placeholders and must be consumed from this file.
 */

export const SOKEM_CONFIG = {
  name: "Sokem Bar & Restaurant",
  tagline: "Culinary Elegance & Handcrafted Libations",
  description:
    "Experience elevated dining, world-class mixology, and an unforgettable luxury ambience at Sokem Bar & Restaurant.",
  logo: "/images/logo.png",
  
  // Business Contact Details
  address: "Sokem Bar & Restaurant",
  city: "Addis Ababa, Ethiopia",
  phone: "093 001 4033",
  mapUrl: "https://maps.app.goo.gl/MJnT1GHeW1mSMDQr5",
  email: "biluquick123@gmail.com",
  
  // Operating Hours Schedule
  hours: {
    schedule: [
      { day: "Sunday", time: "6 AM–11:30 PM" },
      { day: "Monday", time: "6 AM–11:30 PM" },
      { day: "Tuesday", time: "6 AM–11:30 PM" },
      { day: "Wednesday", time: "6 AM–11:30 PM" },
      { day: "Thursday", time: "6 AM–11:30 PM" },
      {
        day: "Friday",
        subtitle: "(Enkutatash)",
        time: "6 AM–11:30 PM",
        note: "Hours might differ",
      },
      { day: "Saturday", time: "6 AM–11:30 PM" },
    ],
    summary: "6 AM–11:30 PM Daily",
    weekday: "Monday - Thursday: 6 AM–11:30 PM",
    weekend: "Friday - Saturday: 6 AM–11:30 PM",
    sunday: "Sunday: 6 AM–11:30 PM",
  },

  // Social Media Links
  socials: {
    instagram: "https://instagram.com/[SOKEM_INSTAGRAM_PLACEHOLDER]",
    facebook: "https://facebook.com/[SOKEM_FACEBOOK_PLACEHOLDER]",
    twitter: "https://x.com/[SOKEM_TWITTER_PLACEHOLDER]",
  },

  // Navigation Links
  navLinks: [
    { label: "Home", href: "/" },
    { label: "Menu", href: "/menu" },
    { label: "Reservations", href: "/reservations" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ],

  // Admin Links
  adminNavLinks: [
    { label: "Overview", href: "/admin/dashboard" },
    { label: "Menu Manager", href: "/admin/menu" },
    { label: "Reservations", href: "/admin/reservations" },
    { label: "Events", href: "/admin/events" },
  ],
};

export type SiteConfig = typeof SOKEM_CONFIG;
