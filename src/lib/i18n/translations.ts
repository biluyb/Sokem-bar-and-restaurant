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
    orderNow: string;
    orderModalTitle: string;
    orderModalSubtitle: string;
    callToOrder: string;
    copyNumber: string;
    copied: string;
    orderHoursNotice: string;
    kitchenDirect: string;
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
  admin: {
    consoleTitle: string;
    staffPortalTitle: string;
    viewPublicSite: string;
    signOut: string;
    signingOut: string;
    themeLight: string;
    themeDark: string;
    nightMode: string;
    lightMode: string;
    nav: {
      overview: string;
      menuManager: string;
      gallery: string;
      events: string;
      reservations: string;
      users: string;
      auditLogs: string;
    };
    dashboard: {
      title: string;
      subtitle: string;
      tonightCovers: string;
      tablesConfirmed: string;
      manage: string;
      menuItemsActive: string;
      realtimeSync: string;
      specialEvents: string;
      scheduled: string;
      menuAvailability: string;
      menuAvailabilitySubtitle: string;
      available: string;
      unavailable: string;
      markAvailable: string;
      markUnavailable: string;
      recentReservations: string;
      guestName: string;
      guests: string;
      time: string;
      status: string;
      confirm: string;
      cancel: string;
      confirmed: string;
      pending: string;
      cancelled: string;
    };
    menuManager: {
      title: string;
      subtitle: string;
      addDish: string;
      searchPlaceholder: string;
      allCategories: string;
      allStock: string;
      inStock: string;
      soldOut: string;
      dishName: string;
      price: string;
      category: string;
      status: string;
      actions: string;
      available: string;
      unavailable: string;
      editDish: string;
      deleteDish: string;
      noDishesFound: string;
      saveDish: string;
      cancel: string;
      description: string;
      image: string;
      dietaryFlags: string;
      uploading: string;
      confirmDelete: string;
    };
    eventManager: {
      title: string;
      subtitle: string;
      addEvent: string;
      searchPlaceholder: string;
      totalScheduled: string;
      highlightEvent: string;
      visiblePublic: string;
      noEventsFound: string;
      date: string;
      time: string;
      badge: string;
      description: string;
      editEvent: string;
      deleteEvent: string;
      saveEvent: string;
      cancel: string;
      confirmDelete: string;
    };
    galleryManager: {
      title: string;
      subtitle: string;
      addPhoto: string;
      searchPlaceholder: string;
      allCategories: string;
      category: string;
      caption: string;
      deletePhoto: string;
      noPhotosFound: string;
      savePhoto: string;
      cancel: string;
      confirmDelete: string;
    };
    auditLogs: {
      title: string;
      subtitle: string;
      noLogs: string;
      noLogsSubtitle: string;
      action: string;
      resource: string;
      user: string;
      timestamp: string;
      details: string;
    };
    users: {
      title: string;
      subtitle: string;
      addUser: string;
      name: string;
      email: string;
      role: string;
      status: string;
      active: string;
      inactive: string;
      actions: string;
      noUsers: string;
    };
    reservationsPage: {
      title: string;
      subtitle: string;
      newReservation: string;
      totalBookings: string;
      confirmedCovers: string;
      pendingReview: string;
      seatedCompleted: string;
      allRecords: string;
      requiresAction: string;
      currentlyDining: string;
      searchPlaceholder: string;
      allStatuses: string;
      guest: string;
      date: string;
      time: string;
      guests: string;
      table: string;
      status: string;
      actions: string;
      noReservations: string;
      export: string;
      confirm: string;
      cancel: string;
    };
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
      orderNow: "Order Now",
      orderModalTitle: "Order by Phone",
      orderModalSubtitle: "Call our kitchen directly to place your order for takeout or table-ready dining.",
      callToOrder: "Call to Order",
      copyNumber: "Copy Number",
      copied: "Copied!",
      orderHoursNotice: "Kitchen & Bar open daily: 6:00 AM – 11:30 PM",
      kitchenDirect: "Direct Kitchen Line",
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
    admin: {
      consoleTitle: "Sokem Management Console",
      staffPortalTitle: "Sokem Staff Portal",
      viewPublicSite: "View Public Site",
      signOut: "Sign Out",
      signingOut: "Signing Out...",
      themeLight: "Light",
      themeDark: "Dark",
      nightMode: "Night Mode",
      lightMode: "Light Mode",
      nav: {
        overview: "Overview",
        menuManager: "Menu Manager",
        gallery: "Gallery",
        events: "Events",
        reservations: "Reservations",
        users: "Users",
        auditLogs: "Audit Logs",
      },
      dashboard: {
        title: "Operations & Control",
        subtitle: "Real-time restaurant operations, seating covers, and menu stock status",
        tonightCovers: "Tonight's Covers",
        tablesConfirmed: "Tables Confirmed",
        manage: "Manage",
        menuItemsActive: "Menu Items Active",
        realtimeSync: "Real-time sync active",
        specialEvents: "Special Events",
        scheduled: "Scheduled",
        menuAvailability: "Menu Availability & Stock",
        menuAvailabilitySubtitle: "Toggle item availability for tonight's service",
        available: "Available",
        unavailable: "Unavailable",
        markAvailable: "Mark Available",
        markUnavailable: "Mark Unavailable",
        recentReservations: "Recent Reservations",
        guestName: "Guest",
        guests: "Guests",
        time: "Time",
        status: "Status",
        confirm: "Confirm",
        cancel: "Cancel",
        confirmed: "Confirmed",
        pending: "Pending",
        cancelled: "Cancelled",
      },
      menuManager: {
        title: "Menu & Stock Manager",
        subtitle: "Live catalog control, dish pricing, availability switches, and culinary specials",
        addDish: "Add New Dish",
        searchPlaceholder: "Search dish name, description, ingredients...",
        allCategories: "All Categories",
        allStock: "All Stock",
        inStock: "In Stock",
        soldOut: "Sold Out",
        dishName: "Dish Name",
        price: "Price (ETB)",
        category: "Category",
        status: "Status",
        actions: "Actions",
        available: "Available",
        unavailable: "Unavailable",
        editDish: "Edit Dish",
        deleteDish: "Delete Dish",
        noDishesFound: "No menu items match your search.",
        saveDish: "Save Dish",
        cancel: "Cancel",
        description: "Description",
        image: "Image",
        dietaryFlags: "Dietary Highlights",
        uploading: "Uploading...",
        confirmDelete: "Are you sure you want to delete this menu item?",
      },
      eventManager: {
        title: "Events & Theme Nights Manager",
        subtitle: "Schedule live performances, cocktail masterclasses, DJ sets, and special evenings",
        addEvent: "Schedule New Event",
        searchPlaceholder: "Search events by title or theme...",
        totalScheduled: "Total Scheduled",
        highlightEvent: "Highlight Event",
        visiblePublic: "Visible on public events page",
        noEventsFound: "No events found matching your criteria.",
        date: "Date",
        time: "Time",
        badge: "Badge",
        description: "Description",
        editEvent: "Edit Event",
        deleteEvent: "Delete Event",
        saveEvent: "Save Event",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to remove this event?",
      },
      galleryManager: {
        title: "Gallery Manager",
        subtitle: "Manage photo assets, ambience showcases, food plating, and venue highlights",
        addPhoto: "Add New Photo",
        searchPlaceholder: "Search photos by caption or category...",
        allCategories: "All Categories",
        category: "Category",
        caption: "Caption / Title",
        deletePhoto: "Delete Photo",
        noPhotosFound: "No photos found matching your criteria.",
        savePhoto: "Save Photo",
        cancel: "Cancel",
        confirmDelete: "Are you sure you want to remove this photo from the gallery?",
      },
      auditLogs: {
        title: "Audit Logs",
        subtitle: "Immutable security trail of administrative mutations, logins, and system changes",
        noLogs: "No audit logs found",
        noLogsSubtitle: "Activity will appear here as actions are performed.",
        action: "Action",
        resource: "Resource",
        user: "User",
        timestamp: "Timestamp",
        details: "Details",
      },
      users: {
        title: "User Management",
        subtitle: "Manage staff and admin accounts for the Sokem platform",
        addUser: "Add User",
        name: "Name",
        email: "Email",
        role: "Role",
        status: "Status",
        active: "Active",
        inactive: "Inactive",
        actions: "Actions",
        noUsers: "No users found",
      },
      reservationsPage: {
        title: "Reservations",
        subtitle: "Manage and update guest reservation statuses",
        newReservation: "New Reservation",
        totalBookings: "Total Bookings",
        confirmedCovers: "Confirmed Covers",
        pendingReview: "Pending Review",
        seatedCompleted: "Seated / Completed",
        allRecords: "All records",
        requiresAction: "Requires action",
        currentlyDining: "Currently dining",
        searchPlaceholder: "Search by guest name, phone, code...",
        allStatuses: "All Statuses",
        guest: "Guest",
        date: "Date",
        time: "Time",
        guests: "Guests",
        table: "Table",
        status: "Status",
        actions: "Actions",
        noReservations: "No reservations found",
        export: "Export CSV",
        confirm: "Confirm",
        cancel: "Cancel",
      },
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
      gallery: "ምስሎች",
      contact: "አድራሻ",
      signIn: "ግባ",
      bookTable: "ቦታ ያስይዙ",
      statusOpen: "ዛሬ ክፍት ነው • የቦታ ማስያዣ ዝግጁ ነው",
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
      eventsTitle: "ልዩ ዝግጅቶች",
      eventsSubtitle: "የቀጥታ ጃዝ ሙዚቃ ምሽቶች እና ልዩ የመስተንግዶ ዝግጅቶች በአዲስ አበባ።",
      viewAllEvents: "ሁሉንም ዝግጅቶች ይመልከቱ",
      ambienceTitle: "ልዩ ድባብና ውበት",
      ambienceSubtitle: "ለማይረሳ የደስታ ጊዜ እና ለበዓላት ተብሎ የተዘጋጀ ምቹ የመስተንግዶ ቦታ።",
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
      clearFilter: "አጽዳ",
      noItemsFound: "የተፈለገው የምግብ ዓይነት አልተገኘም።",
      viewDetails: "ዝርዝር ይመልከቱ",
      orderNow: "አሁን ይዘዙ",
      orderModalTitle: "በስልክ ይዘዙ",
      orderModalSubtitle: "ምግብ ለማዘዝ ወይም ለውሰድ ትዕዛዝ በቀጥታ ወደ ኩሽናችን ይደውሉ።",
      callToOrder: "ለማዘዝ ይደውሉ",
      copyNumber: "ስልክ ቁጥር ቅዳ",
      copied: "ተቀድቷል!",
      orderHoursNotice: "የምግብ እና ባር ክፍት ሰዓት፡ በየቀኑ ከጠዋቱ 12:00 እስከ ማታ 5:30",
      kitchenDirect: "ቀጥታ ስልክ",
      ingredients: "ዋና ይዘቶች",
      dietary: {
        chefSpecial: "የሼፍ ልዩ ምግብ",
        signatureCocktail: "የተመረጠ ልዩ ኮክቴል",
        glutenFree: "ከግሉተን ነፃ",
        vegetarian: "የአትክልት",
        vegan: "የጾም/ቪጋን",
      },
    },
    reservations: {
      badge: "የኦንላይን ቦታ ማስያዣ",
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
      rsvpRequired: "ቀድሞ ቦታ ማስያዝ ይመከራል",
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
        "ስለ ቦታ ማስያዝ ፣ የግል ዝግጅቶች ወይም ሌላ ማንኛውም ጥያቄ የመስተንግዶ ቡድናችንን ያነጋግሩ።",
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
    admin: {
      consoleTitle: "የሶከም አስተዳደር ማዕከል",
      staffPortalTitle: "የሶከም ሰራተኛ ፖርታል",
      viewPublicSite: "ዋናውን ድረ-ገጽ ይመልከቱ",
      signOut: "ውጣ",
      signingOut: "በመውጣት ላይ...",
      themeLight: "ቀን",
      themeDark: "ሌሊት",
      nightMode: "የማታ ገጽታ",
      lightMode: "የቀን ገጽታ",
      nav: {
        overview: "አጠቃላይ እይታ",
        menuManager: "የምግብ አስተዳደር",
        gallery: "የፎቶ ማዕከል",
        events: "ዝግጅቶች",
        reservations: "ቦታ ማስያዣዎች",
        users: "ተጠቃሚዎች",
        auditLogs: "የስራ ታሪክ",
      },
      dashboard: {
        title: "ስራዎች እና ቁጥጥር",
        subtitle: "ወቅታዊ የሬስቶራንት ስራ፣ የጠረጴዛ ሁኔታ እና የምናሌ ክምችት",
        tonightCovers: "የዛሬ ምሽት እንግዶች",
        tablesConfirmed: "ጠረጴዛዎች ተረጋግጠዋል",
        manage: "አስተዳደር",
        menuItemsActive: "ንቁ የምናሌ ምርቶች",
        realtimeSync: "ወቅታዊ ትስስር ንቁ ነው",
        specialEvents: "ልዩ ዝግጅቶች",
        scheduled: "ታቅደዋል",
        menuAvailability: "የምናሌ ተገኝነት እና ክምችት",
        menuAvailabilitySubtitle: "ለዛሬ ምሽት ምርቶቹን ያብሩ ወይም ያጥፉ",
        available: "ዝግጁ",
        unavailable: "አይገኝም",
        markAvailable: "እንዳለ ምልክት አድርግ",
        markUnavailable: "እንደሌለ ምልክት አድርግ",
        recentReservations: "የቅርብ ቦታ ማስያዣዎች",
        guestName: "እንግዳ",
        guests: "እንግዶች",
        time: "ሰዓት",
        status: "ሁኔታ",
        confirm: "አረጋግጥ",
        cancel: "ሰርዝ",
        confirmed: "ተረጋግጧል",
        pending: "በጥበቃ ላይ",
        cancelled: "ተሰርዟል",
      },
      menuManager: {
        title: "የምግብና መጠጥ ዝርዝር አስተዳደር",
        subtitle: "የምግብ ካታሎግ፣ ዋጋዎች፣ ተገኝነት እና ልዩ ምግቦች ቁጥጥር",
        addDish: "አዲስ ምግብ ጨምር",
        searchPlaceholder: "የምግብ ስም፣ ማብራሪያ፣ ይዘት ፈልግ...",
        allCategories: "ሁሉም ምድቦች",
        allStock: "ሁሉም ክምችት",
        inStock: "በክምችት ላይ ያለ",
        soldOut: "ያለቀ / የሌለ",
        dishName: "የምግብ ስም",
        price: "ዋጋ (ብር)",
        category: "ምድብ",
        status: "ሁኔታ",
        actions: "እርምጃዎች",
        available: "አለ",
        unavailable: "የለም",
        editDish: "አስተካክል",
        deleteDish: "አስወግድ",
        noDishesFound: "የተፈለገው የምግብ ዓይነት አልተገኘም።",
        saveDish: "መዝግብ",
        cancel: "ሰርዝ",
        description: "ዝርዝር ማብራሪያ",
        image: "ምስል",
        dietaryFlags: "የአመጋገብ ሁኔታዎች",
        uploading: "በመጫን ላይ...",
        confirmDelete: "እርግጠኛ ነዎት ይህን ምግብ ማስወገድ ይፈልጋሉ?",
      },
      eventManager: {
        title: "የዝግጅቶችና ልዩ ምሽቶች አስተዳደር",
        subtitle: "የቀጥታ ሙዚቃ፣ ዲጄ ዝግጅቶች እና ልዩ የምሽት መርሃግብሮችን ያቅዱ",
        addEvent: "አዲስ ዝግጅት ጨምር",
        searchPlaceholder: "ዝግጅቶችን በርዕስ ወይም መለያ ፈልግ...",
        totalScheduled: "አጠቃላይ የታቀዱ",
        highlightEvent: "ዋና ዝግጅት",
        visiblePublic: "በህዝብ ገጽ ላይ የሚታይ",
        noEventsFound: "ምንም ዝግጅት አልተገኘም።",
        date: "ቀን",
        time: "ሰዓት",
        badge: "መለያ",
        description: "ማብራሪያ",
        editEvent: "አስተካክል",
        deleteEvent: "አስወግድ",
        saveEvent: "መዝግብ",
        cancel: "ሰርዝ",
        confirmDelete: "እርግጠኛ ነዎት ይህን ዝግጅት ማስወገድ ይፈልጋሉ?",
      },
      galleryManager: {
        title: "የፎቶ ማዕከል አስተዳደር",
        subtitle: "የሬስቶራንት ውበት፣ ልዩ ምግቦች እና የመስተንግዶ ፎቶዎችን ያስተዳድሩ",
        addPhoto: "አዲስ ፎቶ ጨምር",
        searchPlaceholder: "ፎቶዎችን በመግለጫ ወይም ምድብ ፈልግ...",
        allCategories: "ሁሉም ምድቦች",
        category: "ምድብ",
        caption: "ርዕስ / መግለጫ",
        deletePhoto: "ፎቶ አስወግድ",
        noPhotosFound: "ምንም ፎቶ አልተገኘም።",
        savePhoto: "መዝግብ",
        cancel: "ሰርዝ",
        confirmDelete: "እርግጠኛ ነዎት ይህን ፎቶ ማስወገድ ይፈልጋሉ?",
      },
      auditLogs: {
        title: "የስራ ታሪክ ምዝገባ",
        subtitle: "የአስተዳደር ለውጦች፣ መግቢያዎች እና የስርዓት ለውጦች የማይሻሻል ሰነድ",
        noLogs: "ምንም ታሪክ አልተገኘም",
        noLogsSubtitle: "ድርጊቶች ሲከናወኑ እዚህ ይታያሉ።",
        action: "ድርጊት",
        resource: "ምንጭ",
        user: "ተጠቃሚ",
        timestamp: "ጊዜ",
        details: "ዝርዝሮች",
      },
      users: {
        title: "የተጠቃሚ አስተዳደር",
        subtitle: "ለሶከም መድረክ ሰራተኛ እና አስተዳዳሪ መለያዎችን ያስተዳድሩ",
        addUser: "ተጠቃሚ ጨምር",
        name: "ስም",
        email: "ኢሜይል",
        role: "ሚና",
        status: "ሁኔታ",
        active: "ንቁ",
        inactive: "ንቁ አይደለም",
        actions: "ድርጊቶች",
        noUsers: "ምንም ተጠቃሚ አልተገኘም",
      },
      reservationsPage: {
        title: "የቦታ ማስያዣዎች አስተዳደር",
        subtitle: "የእንግዳ ቦታ ማስያዣዎችን ይቆጣጠሩ፣ ያረጋግጡ እና ሁኔታቸውን ያዘምኑ",
        newReservation: "አዲስ ቦታ ማስያዝ",
        totalBookings: "አጠቃላይ ቦታ ማስያዣዎች",
        confirmedCovers: "የተረጋገጡ እንግዶች",
        pendingReview: "በጥበቃ ላይ ያሉ",
        seatedCompleted: "የተስተናገዱ / የተጠናቀቁ",
        allRecords: "ሁሉም መረጃዎች",
        requiresAction: "ማረጋገጫ የሚሹ",
        currentlyDining: "በመመገብ ላይ ያሉ",
        searchPlaceholder: "በእንግዳ ስም፣ ስልክ፣ ወይም ኮድ ፈልግ...",
        allStatuses: "ሁሉም ሁኔታዎች",
        guest: "እንግዳ",
        date: "ቀን",
        time: "ሰዓት",
        guests: "እንግዶች",
        table: "ጠረጴዛ",
        status: "ሁኔታ",
        actions: "እርምጃዎች",
        noReservations: "ምንም ቦታ ማስያዝ አልተገኘም",
        export: "ወደ ፋይል ቅዳ",
        confirm: "አረጋግጥ",
        cancel: "ሰርዝ",
      },
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
