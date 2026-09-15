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
  address: "Cherkos 15/16",
  city: "Addis Ababa 1000, Ethiopia",
  fullAddress: "Cherkos 15/16, Addis Ababa 1000, Ethiopia",
  coordinates: {
    lat: 9.013883,
    lng: 38.7520751,
  },
  phone: "093 001 4033",
  mapUrl: "https://www.google.com/maps/place/Sokem+Bar+%26+Restaurant/@9.013883,38.7520751,649m/data=!3m2!1e3!4b1!4m6!3m5!1s0x164b85d04527fd2b:0xbb30010e81aa404a!8m2!3d9.013883!4d38.7520751!16s%2Fg%2F11zbfckkmy",
  embedMapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.548074906413!2d38.7520751!3d9.013883!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85d04527fd2b%3A0xbb30010e81aa404a!2sSokem%20Bar%20%26%20Restaurant!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set",
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
