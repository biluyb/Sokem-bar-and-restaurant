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
  
  // Business Contact Details
  address: "Sokem Bar & Restaurant",
  city: "Addis Ababa, Ethiopia",
  phone: "093 001 4033",
  mapUrl: "https://maps.app.goo.gl/MJnT1GHeW1mSMDQr5",
  email: "[SOKEM_EMAIL_PLACEHOLDER]",
  
  // Operating Hours Placeholders
  hours: {
    weekday: "Monday - Thursday: [HOURS_PLACEHOLDER]",
    weekend: "Friday - Saturday: [HOURS_PLACEHOLDER]",
    sunday: "Sunday: [HOURS_PLACEHOLDER]",
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
