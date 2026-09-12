"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Utensils,
  Calendar,
  Sparkles,
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  Wine,
  Beer,
  Flame,
  Coffee,
  Martini,
} from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { OrderPhoneModal } from "@/components/ui/OrderPhoneModal";
import { MOCK_MENU_ITEMS, MOCK_EVENTS } from "@/lib/data";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/components/ui/LanguageContext";

export default function HomePage() {
  const { t, locale } = useLanguage();
  const [items, setItems] = React.useState(MOCK_MENU_ITEMS);
  const [events, setEvents] = React.useState(MOCK_EVENTS);
  const [orderModalItem, setOrderModalItem] = React.useState<MenuItem | null>(null);

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
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  const featuredItems = items.slice(0, 3);
  const featuredEvent = events[0];

  const services = [
    {
      icon: <Utensils className="w-6 h-6" />,
      title: locale === "am" ? "ምግብ" : "Dining",
      description:
        locale === "am"
          ? "በዋና ሼፍ የተዘጋጁ ልዩ ምግቦች፣ የጥብስ ስቴክ እና የባህር ምግቦች በደማቅ ድባብ።"
          : "Chef-crafted cuisine, prime dry-aged steaks, ocean delicacies, and seasonal culinary specialties.",
    },
    {
      icon: <Beer className="w-6 h-6" />,
      title: locale === "am" ? "ቢራ" : "Beer",
      description:
        locale === "am"
          ? "ቀዝቃዛ የድራፍት እና የታሸጉ ቢራዎች ለማንኛውም አስደሳች ወዳጃዊ መሰብሰቢያ።"
          : "A refreshing selection of draught and bottled beers served chilled for any gathering or relaxed evening.",
    },
    {
      icon: <Flame className="w-6 h-6" />,
      title: locale === "am" ? "ዊስኪ" : "Whisky",
      description:
        locale === "am"
          ? "የተመረጡ ሲንግል ሞልት እና ፕሪሚየም ዊስኪዎች ለጠቢባን የቀረቡ።"
          : "Distinguished single malts, reserve blended whiskies, and curated tasting pours for connoisseurs.",
    },
    {
      icon: <Wine className="w-6 h-6" />,
      title: locale === "am" ? "ወይን" : "Wine",
      description:
        locale === "am"
          ? "ከዓለም አቀፍ ደረጃ የተመረጡ ቀይ፣ ነጭ እና ስፓርክሊንግ ወይኖች።"
          : "An international cellar of select red, white, and sparkling vintages chosen to complement every course.",
    },
    {
      icon: <Martini className="w-6 h-6" />,
      title: locale === "am" ? "ኮክቴሎች" : "Cocktails",
      description:
        locale === "am"
          ? "ልዩ የእጅ ጥበብ ኮክቴሎች ከተፈጥሯዊ ጭማቂዎችና ልዩ ቅመሞች ጋር።"
          : "Handcrafted artisanal mixology featuring smoked aromatics, bespoke syrups, and premium spirits.",
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: locale === "am" ? "ሌሎች መጠጦች" : "Other Drinks",
      description:
        locale === "am"
          ? "ሞክቴሎች፣ ትኩስ ኤስፕሬሶ ቡናዎች፣ ልዩ ሻይ እና የሚያድሱ ለስላሳ መጠጦች።"
          : "Handcrafted mocktails, freshly brewed espresso beverages, artisanal teas, and refreshing soft drinks.",
    },
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-24">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[82vh] flex items-center justify-center pt-16 pb-12 overflow-hidden">
        {/* Soft Warm Radial Backdrop Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent opacity-60 pointer-events-none" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 z-10"
        >
          {/* Animated Brand Emblem & Pill */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 drop-shadow-[0_0_25px_rgba(245,158,11,0.35)]">
              <Image
                src="/images/icon.png"
                alt="Sokem Bar and Restaurant"
                fill
                priority
                className="object-contain"
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/15 dark:bg-gold/20 border border-amber-500/30 dark:border-gold/40 text-amber-900 dark:text-gold-light text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-gold" />
              <span>{t.hero.badge}</span>
            </div>
          </motion.div>

          {/* Bold, Elegant Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-slate-900 dark:text-white leading-[1.1]"
          >
            {t.hero.title}
          </motion.h1>

          {/* Simple, Warm Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-base sm:text-xl text-slate-700 dark:text-gray-200 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            {t.hero.subtitle}
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
                {t.hero.ctaBook}
              </Button>
            </Link>
            <Link href="/menu" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full sm:w-auto gap-2">
                <Utensils className="w-4 h-4" />
                {t.hero.ctaMenu}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Quick Contact Line */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-amber-900 dark:text-gold-light"
          >
            <div className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600 dark:text-gold" />
              <span>{SOKEM_CONFIG.address}, {SOKEM_CONFIG.city}</span>
            </div>
            <span className="text-slate-400">•</span>
            <div className="flex items-center gap-1.5 font-medium">
              <Phone className="w-3.5 h-3.5 text-amber-600 dark:text-gold" />
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
          <span className="text-xs uppercase font-bold text-amber-700 dark:text-gold tracking-widest">
            {locale === "am" ? "አገልግሎቶቻችን" : "What We Offer"}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
            {locale === "am" ? "የምግብ እና ባር አገልግሎቶች" : "Dining & Bar Services"}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
            >
              <Card className="p-8 space-y-4 h-full">
                <div className="w-12 h-12 rounded-2xl bg-gold/15 dark:bg-gold/15 border border-amber-600/30 dark:border-gold/30 flex items-center justify-center text-amber-700 dark:text-gold shadow-sm">
                  {service.icon}
                </div>
                <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed">
                  {service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. FEATURED APPETIZING MENU */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-white/[0.1] pb-6">
          <div className="space-y-1">
            <span className="text-xs uppercase font-bold text-amber-700 dark:text-gold tracking-widest">
              {locale === "am" ? "ከኩሽናችን" : "From Our Kitchen"}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {t.home.highlightsTitle}
            </h2>
          </div>
          <Link href="/menu">
            <Button variant="outline" size="sm" className="gap-2">
              {t.home.viewFullMenu}
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
                      <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <span className="font-serif text-lg font-bold text-amber-700 dark:text-gold shrink-0">
                        {formatPrice(item.price, item.currency)}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-gray-300 leading-relaxed line-clamp-2">
                      {item.description}
                    </p>
                  </CardContent>
                </div>

                <div className="px-6 pb-6 pt-3 border-t border-slate-100 dark:border-white/[0.06] flex items-center justify-between gap-2 text-xs text-slate-500 dark:text-gray-400">
                  <span className="truncate">{item.categoryName}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link href="/menu" className="text-amber-700 dark:text-gold font-semibold hover:underline flex items-center gap-1">
                      {t.common.viewDetails}
                    </Link>
                    <button
                      onClick={() => setOrderModalItem(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-500 hover:bg-amber-600 active:scale-95 text-slate-950 shadow-sm transition-all cursor-pointer"
                      title={t.menu.orderNow}
                    >
                      <Phone className="w-3 h-3" />
                      <span>{t.menu.orderNow}</span>
                    </button>
                  </div>
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
            className="luminous-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-amber-500/30 dark:border-gold/30"
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
              <span className="text-xs uppercase font-bold text-amber-700 dark:text-gold tracking-widest">
                {locale === "am" ? "ልዩ ዝግጅት" : "Special Event"}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                {featuredEvent.title}
              </h3>
              <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
                {featuredEvent.description}
              </p>
              <div className="flex items-center gap-6 text-xs text-slate-700 dark:text-gold-light font-medium">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-amber-600 dark:text-gold" />
                  <span>{featuredEvent.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 dark:text-gold" />
                  <span>{featuredEvent.time}</span>
                </div>
              </div>
              <div className="pt-2">
                <Link href="/reservations">
                  <Button variant="primary" size="md" className="gap-2">
                    {t.events.reserveSpot}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {/* 5. RESERVATION CALL TO ACTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          whileInView={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 30 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="luminous-card p-10 sm:p-16 rounded-3xl border border-amber-500/30 dark:border-gold/30 space-y-6 relative overflow-hidden"
        >
          <div className="w-14 h-14 rounded-full bg-gold/20 text-amber-700 dark:text-gold flex items-center justify-center mx-auto shadow-sm">
            <Calendar className="w-6 h-6" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-slate-900 dark:text-white">
              {t.reservations.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-gray-300 leading-relaxed">
              {t.home.ambienceSubtitle}
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/reservations">
              <Button variant="primary" size="lg">
                {t.hero.ctaBook}
              </Button>
            </Link>
            <a href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}>
              <Button variant="outline" size="lg">
                {t.common.callUs}: {SOKEM_CONFIG.phone}
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Order Phone Dialog */}
      <OrderPhoneModal
        isOpen={!!orderModalItem}
        onClose={() => setOrderModalItem(null)}
        item={orderModalItem}
      />
    </div>
  );
}
