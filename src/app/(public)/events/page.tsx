"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_EVENTS } from "@/lib/data";
import { useLanguage } from "@/components/ui/LanguageContext";

export default function EventsPage() {
  const { t, locale } = useLanguage();
  const [events, setEvents] = React.useState(MOCK_EVENTS);

  React.useEffect(() => {
    fetch("/api/events")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setEvents(data);
        }
      })
      .catch(() => {});
  }, []);

  const eventsJsonLd = events.map((event) => ({
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    image: event.imageUrl,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Sokem Bar & Restaurant",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Legehar",
        addressLocality: "Addis Ababa",
        addressCountry: "ET",
      },
    },
  }));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-24 space-y-16">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-amber-600/30 dark:border-gold/30 text-amber-900 dark:text-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.events.badge}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          {t.events.title}
        </h1>
        <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {t.events.subtitle}
        </p>
      </motion.div>

      {/* Events List */}
      <div className="space-y-8 max-w-5xl mx-auto">
        {events.length > 0 ? (
          events.map((event, index) => (
            <motion.div
              key={event.id}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 30 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="luminous-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-slate-200 dark:border-white/[0.1] hover:border-amber-500/40 dark:hover:border-gold/40 transition-all duration-300"
            >
              <div className="relative h-64 lg:h-auto lg:col-span-5 min-h-[300px]">
                <Image
                  src={event.imageUrl || ""}
                  alt={event.title}
                  fill
                  className="object-cover"
                />
                {event.badge && (
                  <div className="absolute top-4 left-4">
                    <Badge variant="gold">{event.badge}</Badge>
                  </div>
                )}
              </div>

              <div className="p-5 sm:p-8 lg:p-10 lg:col-span-7 flex flex-col justify-between space-y-6">
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center gap-4 text-xs text-amber-700 dark:text-gold font-medium">
                    <span className="flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-4 h-4 text-amber-600 dark:text-gold" />
                      {event.date}
                    </span>
                    <span className="text-slate-400">•</span>
                    <span className="flex items-center gap-1.5 text-slate-600 dark:text-gray-300">
                      <Clock className="w-4 h-4 text-amber-600 dark:text-gold" />
                      {event.time}
                    </span>
                  </div>

                  <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 dark:text-white">
                    {event.title}
                  </h2>

                  <p className="text-slate-600 dark:text-gray-300 text-sm leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-slate-200 dark:border-white/[0.08]">
                  <Link href="/reservations" className="w-full sm:w-auto">
                    <Button variant="primary" size="md" className="w-full sm:w-auto gap-2">
                      {t.events.reserveSpot}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/contact" className="w-full sm:w-auto">
                    <Button variant="ghost" size="md" className="w-full sm:w-auto">
                      {locale === "am" ? "የግል ቦታ ለማስያዝ" : "Private Bookings"}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-16">
            <p className="text-slate-600 dark:text-gray-400 text-sm">
              {t.events.noEvents}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
