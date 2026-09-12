export type Locale = "en" | "am";

export interface TranslationDictionary {
  nav: {
    home: string;
    menu: string;
    reservations: string;
    events: string;
    gallery: string;
    contact: string;
    signIn: string;
    bookTable: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaMenu: string;
    ctaBook: string;
  };
  common: {
    callUs: string;
    location: string;
    hours: string;
    viewAll: string;
  };
}

export const translations: Record<Locale, TranslationDictionary> = {
  en: {
    nav: {
      home: "Home",
      menu: "Menu",
      reservations: "Reservations",
      events: "Events",
      gallery: "Gallery",
      contact: "Contact",
      signIn: "Sign In",
      bookTable: "Book Table",
    },
    hero: {
      badge: "Addis Ababa • Luxury Fine Dining & Cocktails",
      title: "Culinary Elegance & Handcrafted Libations",
      subtitle:
        "An intimate atmosphere of refined dining, dry-aged prime cuts, ocean delicacies, and bespoke mixology in the heart of Addis Ababa.",
      ctaMenu: "Explore Menu",
      ctaBook: "Reserve a Table",
    },
    common: {
      callUs: "Call Concierge",
      location: "Legehar, Addis Ababa",
      hours: "6 AM – 11:30 PM Daily",
      viewAll: "View All",
    },
  },
  am: {
    nav: {
      home: "ዋና ገጽ",
      menu: "የምግብ ዝርዝር",
      reservations: "ቦታ ማስያዣ",
      events: "ዝግጅቶች",
      gallery: "ማዕከለ-ስዕላት",
      contact: "አድራሻ",
      signIn: "ግባ",
      bookTable: "ጠረጴዛ ያስይዙ",
    },
    hero: {
      badge: "አዲስ አበባ • ዘመናዊ ምግብና መጠጥ",
      title: "ምርጥ የምግብ ጣዕምና ልዩ መጠጦች",
      subtitle:
        "በአዲስ አበባ እምብርት ውስጥ ጥራት ያላቸው ምግቦች፣ ልዩ ስቴክ እና ምርጥ ኮክቴሎችን በውብ ድባብ ይደሰቱ።",
      ctaMenu: "ሜኑ ይመልከቱ",
      ctaBook: "ጠረጴዛ ያስይዙ",
    },
    common: {
      callUs: "ይደውሉልን",
      location: "ለገሀር፣ አዲስ አበባ",
      hours: "ከጠዋቱ 12:00 – ማታ 5:30 በየቀኑ",
      viewAll: "ሁሉንም ይመልከቱ",
    },
  },
};
