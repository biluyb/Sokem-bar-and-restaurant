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
    statusOpen: string;
    addressShort: string;
  };
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    ctaBook: string;
    ctaMenu: string;
  };
  common: {
    callUs: string;
    location: string;
    hours: string;
    viewAll: string;
    viewDetails: string;
    viewMap: string;
    loading: string;
    save: string;
    cancel: string;
    close: string;
    previous: string;
    next: string;
    learnMore: string;
  };
  home: {
    highlightsTitle: string;
    highlightsSubtitle: string;
    viewFullMenu: string;
    eventsTitle: string;
    eventsSubtitle: string;
    viewAllEvents: string;
    ambienceTitle: string;
    ambienceSubtitle: string;
    experiencePrompt: string;
    reserveButton: string;
  };
  menu: {
    badge: string;
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    allCategory: string;
    clearFilter: string;
    noItemsFound: string;
    viewDetails: string;
    ingredients: string;
    dietary: {
      chefSpecial: string;
      signatureCocktail: string;
      glutenFree: string;
      vegetarian: string;
      vegan: string;
    };
  };
  reservations: {
    badge: string;
    title: string;
    subtitle: string;
    stepPartySize: string;
    stepDateTime: string;
    stepContact: string;
    guests: string;
    timeSlots: string;
    fullName: string;
    fullNamePlaceholder: string;
    emailAddress: string;
    emailPlaceholder: string;
    phoneNumber: string;
    phonePlaceholder: string;
    specialNotes: string;
    specialNotesPlaceholder: string;
    submitButton: string;
    submitting: string;
    successTitle: string;
    successMessage: string;
    bookingCode: string;
    makeAnother: string;
    dateRequired: string;
    timeRequired: string;
    nameRequired: string;
    emailRequired: string;
    phoneRequired: string;
  };
  events: {
    badge: string;
    title: string;
    subtitle: string;
    admissionFree: string;
    rsvpRequired: string;
    reserveSpot: string;
    noEvents: string;
  };
  gallery: {
    badge: string;
    title: string;
    subtitle: string;
    categories: {
      all: string;
      culinary: string;
      cocktails: string;
      ambience: string;
      events: string;
    };
    closeModal: string;
    of: string;
  };
  contact: {
    badge: string;
    title: string;
    subtitle: string;
    visitCardTitle: string;
    addressHeading: string;
    phoneHeading: string;
    hoursHeading: string;
    formCardTitle: string;
    formSubtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendButton: string;
    sendingButton: string;
    successTitle: string;
    successMessage: string;
    sendAnother: string;
  };
  auth: {
    badge: string;
    title: string;
    subtitle: string;
    usernameLabel: string;
    passwordLabel: string;
    signInButton: string;
    signingIn: string;
    authFailed: string;
    secureSession: string;
    backToHome: string;
  };
  footer: {
    tagline: string;
    explore: string;
    locationContact: string;
    viewMap: string;
    rightsReserved: string;
    hours: string;
    findUs: string;
    getDirections: string;
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
      statusOpen: "Open Today • Table Reservations Available",
      addressShort: "Legehar, Addis Ababa",
    },
    hero: {
      badge: "Addis Ababa • Fine Dining & Cocktails",
      title: "Sokem Bar and Restaurant",
      subtitle:
        "Experience prime dry-aged steaks, ocean delicacies, and bespoke cocktails in a radiant, welcoming dining lounge.",
      ctaBook: "Reserve a Table",
      ctaMenu: "Explore Menu",
    },
    common: {
      callUs: "Call Concierge",
      location: "Legehar, Addis Ababa",
      hours: "6 AM – 11:30 PM Daily",
      viewAll: "View All",
      viewDetails: "View Details",
      viewMap: "View on Google Maps →",
      loading: "Loading...",
      save: "Save Changes",
      cancel: "Cancel",
      close: "Close",
      previous: "Previous",
      next: "Next",
      learnMore: "Learn More",
    },
    home: {
      highlightsTitle: "Signature Selections",
      highlightsSubtitle: "Artisan recipes crafted daily by our master kitchen and cocktail team.",
      viewFullMenu: "View Full Menu",
      eventsTitle: "Upcoming Gatherings",
      eventsSubtitle: "Live jazz nights, masterclasses, and curated tasting experiences in Addis Ababa.",
      viewAllEvents: "View All Events",
      ambienceTitle: "Atmosphere & Craft",
      ambienceSubtitle: "An intimate, candlelit environment designed for unforgettable celebrations.",
      experiencePrompt: "Ready for an extraordinary dining experience?",
      reserveButton: "Book Your Table Now",
    },
    menu: {
      badge: "Our Full Selection",
      title: "Food & Cocktail Menu",
      subtitle:
        "From wood-fired prime steaks to handcrafted artisanal mixology, explore our fresh daily dishes in Addis Ababa.",
      searchPlaceholder: "Search dishes, ingredients, drinks...",
      allCategory: "All",
      clearFilter: "Clear filter",
      noItemsFound: "No menu items match your search criteria.",
      viewDetails: "View Details",
      ingredients: "Key Ingredients",
      dietary: {
        chefSpecial: "Chef Special",
        signatureCocktail: "Signature Cocktail",
        glutenFree: "Gluten-Free",
        vegetarian: "Vegetarian",
        vegan: "Vegan",
      },
    },
    reservations: {
      badge: "Online Reservations",
      title: "Book a Table at Sokem",
      subtitle: "Reserve your dining experience online or call us directly at",
      stepPartySize: "1. Select Party Size",
      stepDateTime: "2. Choose Date & Seating Time",
      stepContact: "3. Guest Information",
      guests: "Guests",
      timeSlots: "Available Time Slots",
      fullName: "Full Name",
      fullNamePlaceholder: "e.g. Eleanor Vance",
      emailAddress: "Email Address",
      emailPlaceholder: "eleanor@example.com",
      phoneNumber: "Phone Number",
      phonePlaceholder: "091 123 4567",
      specialNotes: "Special Requests or Dietary Requirements",
      specialNotesPlaceholder: "Window table, anniversary celebration, allergies, etc.",
      submitButton: "Confirm Table Reservation",
      submitting: "Submitting Booking...",
      successTitle: "Reservation Confirmed",
      successMessage: "Thank you! Your table request has been received. Our concierge will follow up if needed.",
      bookingCode: "Booking Reference",
      makeAnother: "Make Another Booking",
      dateRequired: "Please choose a reservation date.",
      timeRequired: "Please select a dining time slot.",
      nameRequired: "Please enter your full name.",
      emailRequired: "Please provide a valid email address.",
      phoneRequired: "Please provide a contact phone number.",
    },
    events: {
      badge: "Evenings & Experiences",
      title: "Atmospheric Evenings",
      subtitle:
        "Join us for curated live music, seasonal tasting sessions, and weekend cocktail performances in Addis Ababa.",
      admissionFree: "Complimentary Entry",
      rsvpRequired: "RSVP Recommended",
      reserveSpot: "Reserve Table for Event",
      noEvents: "No scheduled events right now. Check back soon!",
    },
    gallery: {
      badge: "Photos & Ambience",
      title: "Visual Atmosphere",
      subtitle:
        "A vibrant look into our kitchen craft, cocktail bar, and candlelit rooms in Addis Ababa.",
      categories: {
        all: "All",
        culinary: "Culinary",
        cocktails: "Cocktails",
        ambience: "Ambience",
        events: "Events",
      },
      closeModal: "Close image",
      of: "of",
    },
    contact: {
      badge: "Get in Touch",
      title: "Location & Inquiries",
      subtitle:
        "Reach our hospitality team in Addis Ababa for table questions, private bookings, or special requests.",
      visitCardTitle: "Visit Sokem",
      addressHeading: "Address",
      phoneHeading: "Direct Phone",
      hoursHeading: "Opening Hours",
      formCardTitle: "Send a Direct Message",
      formSubtitle: "Messages are sent directly to our guest relations team.",
      nameLabel: "Your Name",
      namePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "name@example.com",
      subjectLabel: "Subject",
      subjectPlaceholder: "Table inquiry, private event, feedback...",
      messageLabel: "Message",
      messagePlaceholder: "How can our hospitality team assist you?",
      sendButton: "Send Message",
      sendingButton: "Sending Message...",
      successTitle: "Message Delivered",
      successMessage: "Thank you for reaching out. Our hospitality concierge will respond promptly.",
      sendAnother: "Send Another Message",
    },
    auth: {
      badge: "Sokem Management",
      title: "Sign In",
      subtitle: "Enter your authorized credentials to access the management console.",
      usernameLabel: "Username or Email",
      passwordLabel: "Password",
      signInButton: "Sign In",
      signingIn: "Verifying credentials...",
      authFailed: "Authentication Failed",
      secureSession: "Encrypted HTTP-only Session",
      backToHome: "Return to Public Website",
    },
    footer: {
      tagline: "Fine Dining & Cocktail Lounge",
      explore: "Dining & Experiences",
      locationContact: "Hours & Contact",
      viewMap: "View on Google Maps →",
      rightsReserved: "All rights reserved.",
      hours: "Operating Hours",
      findUs: "Location & Map",
      getDirections: "Get Directions on Google Maps",
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
      statusOpen: "ዛሬ ክፍት ነው • የጠረጴዛ ማስያዣ ዝግጁ ነው",
      addressShort: "ለገሀር፣ አዲስ አበባ",
    },
    hero: {
      badge: "አዲስ አበባ • ዘመናዊ ምግብና ኮክቴል",
      title: "ሶከም ባር እና ሬስቶራንት",
      subtitle:
        "ጥራት ያላቸው ልዩ ምግቦች፣ ስቴክ እና ምርጥ ኮክቴሎችን በሞቃትና ውብ ድባብ ይደሰቱ።",
      ctaBook: "ጠረጴዛ ያስይዙ",
      ctaMenu: "ሜኑ ይመልከቱ",
    },
    common: {
      callUs: "ይደውሉልን",
      location: "ለገሀር፣ አዲስ አበባ",
      hours: "ከጠዋቱ 12:00 – ማታ 5:30 በየቀኑ",
      viewAll: "ሁሉንም ይመልከቱ",
      viewDetails: "ዝርዝር ይመልከቱ",
      viewMap: "በጉግል ካርታ ይመልከቱ →",
      loading: "በመጫን ላይ...",
      save: "ለውጦችን መዝግብ",
      cancel: "ሰርዝ",
      close: "ዝጋ",
      previous: "የቀደመ",
      next: "ቀጣይ",
      learnMore: "ተጨማሪ ይወቁ",
    },
    home: {
      highlightsTitle: "የተመረጡ ምግቦች",
      highlightsSubtitle: "በዋና ሼፎቻችን በየዕለቱ በጥንቃቄ የተዘጋጁ ልዩ ምግቦች እና መጠጦች።",
      viewFullMenu: "ሙሉውን ሜኑ ይመልከቱ",
      eventsTitle: "መጪ ዝግጅቶች",
      eventsSubtitle: "የቀጥታ ጃዝ ሙዚቃ ምሽቶች እና ልዩ የመስተንግዶ ዝግጅቶች በአዲስ አበባ።",
      viewAllEvents: "ሁሉንም ዝግጅቶች ይመልከቱ",
      ambienceTitle: "ልዩ ድባብና ውበት",
      ambienceSubtitle: "ለማይረሳ የደስታ ጊዜ እና በዓላት ተብሎ የተዘጋጀ ምቹ የመስተንግዶ ቦታ።",
      experiencePrompt: "ልዩ የመመገቢያ ጊዜ ለማሳለፍ ዝግጁ ነዎት?",
      reserveButton: "አሁኑኑ ጠረጴዛዎን ያስይዙ",
    },
    menu: {
      badge: "ሙሉ የምግብ ዝርዝር",
      title: "የምግብ እና ኮክቴል ሜኑ",
      subtitle:
        "ከልዩ የስጋ ምግቦች እስከ ጥበባዊ ኮክቴሎች ድረስ፣ በየቀኑ የሚዘጋጁ ትኩስ ምግቦችን ይጎብኙ።",
      searchPlaceholder: "ምግቦችን፣ ቅመሞችን፣ መጠጦችን ይፈልጉ...",
      allCategory: "ሁሉም",
      clearFilter: "ማጣሪያን አጽዳ",
      noItemsFound: "የተፈለገው የምግብ ዓይነት አልተገኘም።",
      viewDetails: "ዝርዝር ይመልከቱ",
      ingredients: "ዋና ይዘቶች",
      dietary: {
        chefSpecial: "የሼፍ ልዩ",
        signatureCocktail: "ልዩ ኮክቴል",
        glutenFree: "ከግሉተን ነፃ",
        vegetarian: "የአትክልት",
        vegan: "የጾም/ቪጋን",
      },
    },
    reservations: {
      badge: "የኦንላይን ጠረጴዛ ማስያዣ",
      title: "በሶከም ጠረጴዛ ያስይዙ",
      subtitle: "የመመገቢያ ጠረጴዛዎን በኦንላይን ያስይዙ ወይም በቀጥታ ይደውሉልን በ",
      stepPartySize: "1. የተጠቃሚዎችን ብዛት ይምረጡ",
      stepDateTime: "2. ቀን እና ሰዓት ይምረጡ",
      stepContact: "3. የእውቂያ መረጃ",
      guests: "እንግዶች",
      timeSlots: "ክፍት የሰዓት አማራጮች",
      fullName: "ሙሉ ስም",
      fullNamePlaceholder: "ለምሳሌ፡ አለሙ በቀለ",
      emailAddress: "የኢሜይል አድራሻ",
      emailPlaceholder: "alemu@example.com",
      phoneNumber: "ስልክ ቁጥር",
      phonePlaceholder: "091 123 4567",
      specialNotes: "ልዩ ጥያቄ ወይም ፍላጎት ካለዎት",
      specialNotesPlaceholder: "የመስኮት ጠረጴዛ፣ የልደት በዓል፣ ወዘተ.",
      submitButton: "የጠረጴዛ ማስያዣውን ያረጋግጡ",
      submitting: "በማስያዝ ላይ...",
      successTitle: "ቦታ ማስያዝዎ ተረጋግጧል",
      successMessage: "እናመሰግናለን! ጥያቄዎ ደርሶናል። የመስተንግዶ ክፍላችን አስፈላጊ ከሆነ ይደውልልዎታል።",
      bookingCode: "የቦታ ማስያዣ ቁጥር",
      makeAnother: "ሌላ ጠረጴዛ ያስይዙ",
      dateRequired: "እባክዎን ቀን ይምረጡ።",
      timeRequired: "እባክዎን ሰዓት ይምረጡ።",
      nameRequired: "እባክዎን ሙሉ ስምዎን ያስገቡ።",
      emailRequired: "እባክዎን ትክክለኛ ኢሜይል ያስገቡ።",
      phoneRequired: "እባክዎን የስልክ ቁጥር ያስገቡ።",
    },
    events: {
      badge: "ምሽቶች እና ዝግጅቶች",
      title: "ልዩ የመዝናኛ ምሽቶች",
      subtitle:
        "በቀጥታ የቀረቡ የሙዚቃ ምሽቶች እና ወቅታዊ የመስተንግዶ ዝግጅቶች በአዲስ አበባ ይደሰቱ።",
      admissionFree: "መግቢያ በነጻ",
      rsvpRequired: "ቅድመ ቦታ ማስያዝ ይመከራል",
      reserveSpot: "ለዝግጅቱ ጠረጴዛ ያስይዙ",
      noEvents: "በአሁኑ ሰዓት የታቀደ ዝግጅት የለም። በቅርቡ ይመለሱ!",
    },
    gallery: {
      badge: "ፎቶዎች እና ድባብ",
      title: "የሶከም ገጽታ",
      subtitle:
        "የኩሽናችን ጥበብ፣ የባር ክፍላችን ውበት እና የአዳራሻችን ድባብ በፎቶግራፍ።",
      categories: {
        all: "ሁሉም",
        culinary: "ምግቦች",
        cocktails: "ኮክቴሎች",
        ambience: "ድባብ",
        events: "ዝግጅቶች",
      },
      closeModal: "ፎቶውን ዝጋ",
      of: "ከ",
    },
    contact: {
      badge: "ያግኙን",
      title: "አድራሻ እና ጥያቄዎች",
      subtitle:
        "ስለ ጠረጴዛ፣ የግል ዝግጅቶች ወይም ሌላ ማንኛውም ጥያቄ የመስተንግዶ ቡድናችንን ያነጋግሩ።",
      visitCardTitle: "ሶከምን ይጎብኙ",
      addressHeading: "አድራሻ",
      phoneHeading: "የቀጥታ ስልክ",
      hoursHeading: "የስራ ሰዓት",
      formCardTitle: "ቀጥታ መልእክት ይላኩ",
      formSubtitle: "መልእክትዎ በቀጥታ ለእንግዶች መስተንግዶ ክፍላችን ይደርሳል።",
      nameLabel: "የእርስዎ ስም",
      namePlaceholder: "ሙሉ ስምዎን ያስገቡ",
      emailLabel: "የኢሜይል አድራሻ",
      emailPlaceholder: "name@example.com",
      subjectLabel: "ርዕስ",
      subjectPlaceholder: "የጠረጴዛ ጥያቄ፣ የግል ዝግጅት፣ አስተያየት...",
      messageLabel: "መልእክት",
      messagePlaceholder: "የመስተንግዶ ቡድናችን በምን ሊረዳዎ ይችላል?",
      sendButton: "መልእክት ላክ",
      sendingButton: "በመላክ ላይ...",
      successTitle: "መልእክትዎ ተልኳል",
      successMessage: "እናመሰግናለን። የመስተንግዶ ክፍላችን በፍጥነት ምላሽ ይሰጥዎታል።",
      sendAnother: "ሌላ መልእክት ላክ",
    },
    auth: {
      badge: "የሶከም አስተዳደር",
      title: "ግባ",
      subtitle: "የአስተዳደር ክፍሉን ለመጠቀም የተፈቀደለትን መለያ እና የይለፍ ቃል ያስገቡ።",
      usernameLabel: "የተጠቃሚ ስም ወይም ኢሜይል",
      passwordLabel: "የይለፍ ቃል",
      signInButton: "ግባ",
      signingIn: "በማረጋገጥ ላይ...",
      authFailed: "ማረጋገጥ አልተሳካም",
      secureSession: "ደህንነቱ የተጠበቀ ክፍለ-ጊዜ",
      backToHome: "ወደ ዋናው ድረ-ገጽ ተመለስ",
    },
    footer: {
      tagline: "ዘመናዊ ምግብና ኮክቴል ላውንጅ",
      explore: "ምግቦች እና ዝግጅቶች",
      locationContact: "የስራ ሰዓትና አድራሻ",
      viewMap: "በጉግል ካርታ ይመልከቱ →",
      rightsReserved: "መብቱ በህግ የተጠበቀ ነው።",
      hours: "የስራ ሰዓታት",
      findUs: "አድራሻ እና ካርታ",
      getDirections: "አቅጣጫ በጉግል ካርታ ይመልከቱ",
    },
  },
};
