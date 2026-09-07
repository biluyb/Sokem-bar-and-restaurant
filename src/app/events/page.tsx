"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { MOCK_EVENTS } from "@/lib/data";

export default function EventsPage() {
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Live Music & Special Evenings</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Events & Gatherings
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Discover live jazz sessions, tasting dinners, and sunset hours at Sokem Bar & Restaurant in Addis Ababa.
        </p>
      </motion.div>

      {/* Events List */}
      <div className="space-y-8 max-w-5xl mx-auto">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            whileInView={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 30 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="luminous-card rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 border border-white/[0.1] hover:border-gold/40 transition-all duration-300"
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

            <div className="p-8 sm:p-10 lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-4 text-xs text-gold font-medium">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-gold" />
                    {event.date}
                  </span>
                  <span className="text-gray-400">•</span>
                  <span className="flex items-center gap-1.5 text-gray-300">
                    <Clock className="w-4 h-4 text-gold" />
                    {event.time}
                  </span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                  {event.title}
                </h2>

                <p className="text-gray-300 text-sm leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-4 border-t border-white/[0.08]">
                <Link href="/reservations" className="w-full sm:w-auto">
                  <Button variant="primary" size="md" className="w-full sm:w-auto gap-2">
                    Reserve for this Event
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button variant="ghost" size="md" className="w-full sm:w-auto text-gray-300 hover:text-white">
                    Private Bookings
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
