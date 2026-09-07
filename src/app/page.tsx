"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Utensils,
  Wine,
  Clock,
  Calendar,
  Sparkles,
  MapPin,
  Phone,
  Beer,
  Flame,
  Martini,
  Coffee,
} from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { MOCK_MENU_ITEMS, MOCK_EVENTS } from "@/lib/data";
import { formatPrice } from "@/lib/utils";

export default function HomePage() {
  const [items, setItems] = React.useState(MOCK_MENU_ITEMS);
  const [events, setEvents] = React.useState(MOCK_EVENTS);

  React.useEffect(() => {
    fetch("/api/menu")
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.items && Array.isArray(data.items) && data.items.length > 0) {
          setItems(data.items);
        }
      })
      .catch(() => {});

    fetch("/api/events")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  const featuredItems = items.filter((item) => item.isFeatured).slice(0, 3);
  const featuredEvent = events[0] || MOCK_EVENTS[0];

  const restaurantJsonLd = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: SOKEM_CONFIG.name,
    description: SOKEM_CONFIG.description,
    image: "https://sokem-restaurant.com/images/logo.png",
    telephone: SOKEM_CONFIG.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Legehar",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 9.0138883,
      longitude: 38.7520751,
    },
    servesCuisine: ["Steakhouse", "Fine Dining", "Cocktail Bar", "Wine Bar"],
    priceRange: "$$$",
    hasMenu: "https://sokem-restaurant.com/menu",
  };

  return (
    <div className="space-y-28 pb-28">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantJsonLd) }}
      />

      {/* 1. LUMINOUS HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 sm:pt-16 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Hero Background Image with Warm Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2000&q=85"
            alt="Sokem Restaurant Interior"
            fill
            priority
            className="object-cover object-center filter brightness-[0.45] contrast-110 saturate-110 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas via-canvas/60 to-transparent" />
          <div className="absolute inset-0 bg-radial from-gold/10 via-transparent to-canvas/80" />
        </div>

        {/* Staggered Animated Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10 max-w-4xl mx-auto text-center space-y-8"
        >
          {/* Animated Brand Emblem & Pill */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_0_30px_rgba(245,158,11,0.4)]">
              <Image
                src="/images/icon.png"
                alt="Sokem Bar and Restaurant"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/20 border border-gold/40 text-gold-light text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Welcome to Sokem • Addis Ababa</span>
            </div>
          </motion.div>

          {/* Bold, Elegant Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1]"
          >
            Sokem bar and restaurant
          </motion.h1>

          {/* Simple, Warm Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-xl text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Experience prime dry-aged steaks, ocean delicacies, and bespoke cocktails in a radiant, welcoming dining lounge.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link href="/reservations" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto gap-2">
                <Calendar className="w-4 h-4" />
                Reserve a Table
              </Button>
            </Link>
            <Link href="/menu" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Utensils className="w-4 h-4" />
                View Full Menu
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Quick Contact Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-gold-light"
          >
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span>{SOKEM_CONFIG.address}, {SOKEM_CONFIG.city}</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <a href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`} className="hover:underline font-mono">
                {SOKEM_CONFIG.phone}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. SERVICES & OFFERINGS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <span className="text-xs uppercase font-bold text-gold tracking-widest">
            What We Offer
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Dining & Bar Services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <Utensils className="w-6 h-6" />,
              title: "Dining",
              description:
                "Chef-crafted cuisine, prime dry-aged steaks, ocean delicacies, and seasonal culinary specialties.",
            },
            {
              icon: <Beer className="w-6 h-6" />,
              title: "Beer",
              description:
                "A refreshing selection of draught and bottled beers served chilled for any gathering or relaxed evening.",
            },
            {
              icon: <Flame className="w-6 h-6" />,
              title: "Whisky",
              description:
                "Distinguished single malts, reserve blended whiskies, and curated tasting pours for connoisseurs.",
            },
            {
              icon: <Wine className="w-6 h-6" />,
              title: "Wine",
              description:
                "An international cellar of select red, white, and sparkling vintages chosen to complement every course.",
            },
            {
              icon: <Martini className="w-6 h-6" />,
              title: "Cocktails",
              description:
                "Handcrafted artisanal mixology featuring smoked aromatics, bespoke syrups, and premium spirits.",
            },
            {
              icon: <Coffee className="w-6 h-6" />,
              title: "Other Drinks",
              description:
                "Handcrafted mocktails, freshly brewed espresso beverages, artisanal teas, and refreshing soft drinks.",
            },
          ].map((service, index) => (
            <motion.div
              key={service.title}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="p-8 space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold shadow-glow">
                  {service.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED APPETIZING MENU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/[0.1] pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-gold tracking-widest">
              From Our Kitchen
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Signature Dishes
            </h2>
          </div>
          <Link href="/menu">
            <Button variant="outline" size="sm" className="gap-2">
              Explore Full Menu
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Clean, Bright Food Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <Card className="group flex flex-col justify-between h-full">
                <div>
                  <div className="relative h-64 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl || ""}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 flex flex-wrap gap-1.5">
                      {item.dietaryFlags.map((flag) => (
                        <Badge key={flag} variant="gold">
                          {flag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-serif text-xl font-bold text-white group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-serif text-lg font-bold text-gold shrink-0">
                        {formatPrice(item.price, item.currency)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                </div>

                <div className="px-6 pb-6 pt-0 flex items-center justify-between text-xs text-gray-400">
                  <span>{item.categoryName}</span>
                  <Link href="/menu" className="text-gold font-medium hover:underline flex items-center gap-1">
                    Details →
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. EVENT SPOTLIGHT */}
      {featuredEvent && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            whileInView={{ opacity: 1, scale: 1 }}
            initial={{ opacity: 0, scale: 0.98 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="luminous-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-gold/30"
          >
            <div className="relative h-72 lg:h-auto min-h-[340px]">
              <Image
                src={featuredEvent.imageUrl || ""}
                alt={featuredEvent.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge variant="gold">{featuredEvent.badge}</Badge>
              </div>
            </div>

            <div className="p-8 sm:p-12 flex flex-col justify-center space-y-6">
              <span className="text-xs uppercase font-bold text-gold tracking-widest">
                Special Event
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                {featuredEvent.title}
              </h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {featuredEvent.description}
              </p>
              <div className="flex items-center gap-6 text-xs text-gold-light">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gold" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gold" />
                  <span>{featuredEvent.time}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/reservations">
                  <Button variant="primary" size="md" className="gap-2">
                    Book for This Evening
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 5. SIMPLE, BRIGHT RESERVATION CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="luminous-card p-10 sm:p-16 rounded-3xl border border-gold/30 space-y-6 relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-full bg-gold/20 text-gold flex items-center justify-center mx-auto shadow-glow">
            <Calendar className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Reserve Your Table
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Join us for an unforgettable lunch, dinner, or evening cocktails in Addis Ababa.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reservations">
              <Button variant="primary" size="lg">
                Book Online Instantly
              </Button>
            </Link>
            <a href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}>
              <Button variant="outline" size="lg">
                Call: {SOKEM_CONFIG.phone}
              </Button>
            </a>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
