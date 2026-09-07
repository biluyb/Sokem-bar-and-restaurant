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
    tagline: string;
    title: string;
    subtitle: string;
    exploreMenu: string;
    reserveTable: string;
  };
  menu: {
    title: string;
    subtitle: string;
    all: string;
    available: string;
    soldOut: string;
  };
  reservations: {
    title: string;
    subtitle: string;
    partySize: string;
    date: string;
    time: string;
    name: string;
    email: string;
    phone: string;
    submit: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    contactUs: string;
    rights: string;
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
      tagline: "Fine Dining & Craft Mixology",
      title: "Elevated Dining & Crafted Evenings",
      subtitle: "Experience culinary craftsmanship, masterfully mixed cocktails, and refined ambience in the heart of Addis Ababa.",
      exploreMenu: "Explore Our Menu",
      reserveTable: "Reserve a Table",
    },
    menu: {
      title: "The Culinary Collection",
      subtitle: "Carefully sourced seasonal ingredients, reimagined with precision and passion.",
      all: "All Dishes",
      available: "In Stock",
      soldOut: "Sold Out",
    },
    reservations: {
      title: "Table Reservations",
      subtitle: "Secure your table for an unforgettable culinary evening at Sokem.",
      partySize: "Party Size",
      date: "Date",
      time: "Time",
      name: "Your Name",
      email: "Email Address",
      phone: "Phone Number",
      submit: "Confirm Reservation",
    },
    footer: {
      tagline: "Unforgettable flavours, handcrafted mixology, and refined ambience.",
      quickLinks: "Quick Navigation",
      contactUs: "Contact & Hours",
      rights: "All rights reserved.",
    },
  },
  am: {
    nav: {
      home: "መነሻ",
      menu: "ምናሌ",
      reservations: "ቦታ ማስያዝ",
      events: "ዝግጅቶች",
      gallery: "ፎቶዎች",
      contact: "ያግኙን",
      signIn: "ግባ",
      bookTable: "ጠረጴዛ ይያዙ",
    },
    hero: {
      tagline: "ልዩ የምግብ እና የመጠጥ ተሞክሮ",
      title: "ከፍተኛ ጥራት ያለው ምግብና ማራኪ ድባብ",
      subtitle: "በአዲስ አበባ እምብርት ውስጥ ልዩ የጣዕም ስራዎች፣ ጥበባዊ ኮክቴሎች እና የተረጋጋ ድባብ ይለማመዱ።",
      exploreMenu: "ምናሌውን ይመልከቱ",
      reserveTable: "ጠረጴዛ ይያዙ",
    },
    menu: {
      title: "የምግብ ዝርዝር",
      subtitle: "በጥንቃቄ የተመረጡ ንጥረ ነገሮች፣ በልዩ ፍቅር እና ሙያ የተዘጋጁ።",
      all: "ሁሉም ምግቦች",
      available: "አለ",
      soldOut: "አልቋል",
    },
    reservations: {
      title: "ጠረጴዛ ማስያዝ",
      subtitle: "በሶከም አስደሳች እና የማይረሳ ምሽት ለማሳለፍ ጠረጴዛዎን አሁኑኑ ያስይዙ።",
      partySize: "የሰው ብዛት",
      date: "ቀን",
      time: "ሰዓት",
      name: "ስም",
      email: "ኢሜይል",
      phone: "ስልክ ቁጥር",
      submit: "ቦታ ያረጋግጡ",
    },
    footer: {
      tagline: "የማይረሱ ጣዕሞች፣ ጥበባዊ መጠጦች እና ማራኪ ድባብ።",
      quickLinks: "ፈጣን አሰሳ",
      contactUs: "አድራሻ እና ሰዓታት",
      rights: "መብቱ በህግ የተጠበቀ ነው።",
    },
  },
};
