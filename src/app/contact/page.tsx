"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Sparkles, ExternalLink } from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-24 space-y-16">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3 max-w-2xl mx-auto"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Get in Touch</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white tracking-tight">
          Location & Inquiries
        </h1>
        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
          Reach our hospitality team in Addis Ababa for table questions, private bookings, or special requests.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Details & Hours */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-5 space-y-6"
        >
          <Card className="p-8 space-y-6">
            <h3 className="font-serif text-xl font-bold text-white border-b border-white/[0.08] pb-3">
              Visit Sokem
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-gray-400 block">Address</span>
                  <span className="text-white block font-medium">{SOKEM_CONFIG.address}</span>
                  <span className="text-gray-300 block">{SOKEM_CONFIG.city}</span>
                  {SOKEM_CONFIG.mapUrl && (
                    <a
                      href={SOKEM_CONFIG.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-gold hover:underline mt-1 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Open Location in Google Maps
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-400 block">Phone</span>
                  <a
                    href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
                    className="text-white hover:text-gold transition-colors font-medium font-mono"
                  >
                    {SOKEM_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-gold flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs uppercase font-bold text-gray-400 block">Email</span>
                  <span className="text-white">{SOKEM_CONFIG.email}</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Interactive Map Preview Card */}
          <Card className="overflow-hidden p-0">
            <div className="p-4 border-b border-white/[0.08] flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-300 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-gold" />
                Google Maps Location
              </span>
              <a
                href={SOKEM_CONFIG.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gold hover:underline flex items-center gap-1"
              >
                Directions
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative h-60 w-full bg-canvas-lighter">
              <iframe
                title="Sokem Bar & Restaurant Map"
                src="https://maps.google.com/maps?q=9.0138883,38.7520751&z=17&output=embed"
                className="w-full h-full border-0 filter brightness-90 contrast-110"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Card>

          {/* Opening Schedule */}
          <Card className="p-8 space-y-4">
            <div className="flex items-center gap-2 text-gold">
              <Clock className="w-5 h-5" />
              <h3 className="font-serif text-lg font-bold text-white">Opening Hours</h3>
            </div>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex justify-between border-b border-white/[0.08] pb-2">
                <span className="text-gray-400">Mon - Thu:</span>
                <span>{SOKEM_CONFIG.hours.weekday}</span>
              </li>
              <li className="flex justify-between border-b border-white/[0.08] pb-2">
                <span className="text-gray-400">Fri - Sat:</span>
                <span>{SOKEM_CONFIG.hours.weekend}</span>
              </li>
              <li className="flex justify-between pb-1">
                <span className="text-gray-400">Sunday:</span>
                <span>{SOKEM_CONFIG.hours.sunday}</span>
              </li>
            </ul>
          </Card>
        </motion.div>

        {/* Right Column: Clean Inquiry Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="lg:col-span-7"
        >
          <Card className="p-8 sm:p-10 space-y-6">
            <h3 className="font-serif text-2xl font-bold text-white border-b border-white/[0.08] pb-4">
              Send a Direct Message
            </h3>

            {isSent ? (
              <div className="p-8 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-white">
                  Message Sent
                </h4>
                <p className="text-sm text-gray-300 max-w-sm mx-auto">
                  Thank you for reaching out. Our concierge team will get back to you shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsSent(false);
                    setMessage("");
                    setSubject("");
                  }}
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Your Name *"
                    placeholder="e.g. John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label="Email Address *"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Input
                  label="Subject *"
                  placeholder="e.g. Table Inquiry / Private Event"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                <Textarea
                  label="Message *"
                  placeholder="How can we assist you today?"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="gap-2 w-full sm:w-auto"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
