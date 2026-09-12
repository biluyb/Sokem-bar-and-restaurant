"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Send, CheckCircle2, Sparkles, ExternalLink, Clock } from "lucide-react";
import { SOKEM_CONFIG } from "@/config/site";
import { Input, Textarea } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useLanguage } from "@/components/ui/LanguageContext";

export default function ContactPage() {
  const { t } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message.");
      }

      setIsSent(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
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
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-amber-600/30 dark:border-gold/30 text-amber-900 dark:text-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.contact.badge}</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-bold text-slate-900 dark:text-white tracking-tight">
          {t.contact.title}
        </h1>
        <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          {t.contact.subtitle}
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
            <h3 className="font-serif text-xl font-bold text-slate-900 dark:text-white border-b border-slate-200 dark:border-white/[0.08] pb-3">
              {t.contact.visitCardTitle}
            </h3>

            <div className="space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-amber-700 dark:text-gold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <MapPin className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-slate-500 dark:text-gray-400 block">{t.contact.addressHeading}</span>
                  <span className="text-slate-900 dark:text-white block font-medium">{SOKEM_CONFIG.address}</span>
                  <span className="text-slate-600 dark:text-gray-300 block">{SOKEM_CONFIG.city}</span>
                  {SOKEM_CONFIG.mapUrl && (
                    <a
                      href={SOKEM_CONFIG.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-amber-700 dark:text-gold hover:underline mt-1 font-semibold"
                    >
                      <ExternalLink className="w-3 h-3" />
                      {t.common.viewMap}
                    </a>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-amber-700 dark:text-gold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-slate-500 dark:text-gray-400 block">{t.contact.phoneHeading}</span>
                  <a
                    href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`}
                    className="text-slate-900 dark:text-white hover:text-amber-700 dark:hover:text-gold transition-colors font-mono font-medium block"
                  >
                    {SOKEM_CONFIG.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-gold/15 text-amber-700 dark:text-gold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs uppercase font-bold text-slate-500 dark:text-gray-400 block">Email Inquiries</span>
                  <a
                    href={`mailto:${SOKEM_CONFIG.email}`}
                    className="text-slate-900 dark:text-white hover:text-amber-700 dark:hover:text-gold transition-colors font-medium block"
                  >
                    {SOKEM_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Operating Hours */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] space-y-3">
              <span className="text-xs uppercase font-bold text-slate-500 dark:text-gray-400 flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-gold" />
                {t.contact.hoursHeading}
              </span>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-gray-300">Monday – Sunday</span>
                  <span className="text-slate-900 dark:text-white font-medium">{SOKEM_CONFIG.hours.weekdays}</span>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Right Column: Direct Message Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <Card className="p-8 sm:p-10 space-y-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                {t.contact.formCardTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-gray-400 mt-1">
                {t.contact.formSubtitle}
              </p>
            </div>

            {isSent ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
                  {t.contact.successTitle}
                </h4>
                <p className="text-sm text-slate-600 dark:text-gray-300 max-w-md mx-auto">
                  {t.contact.successMessage}
                </p>
                <div className="pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSent(false);
                      setName("");
                      setEmail("");
                      setSubject("");
                      setMessage("");
                    }}
                  >
                    {t.contact.sendAnother}
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label={t.contact.nameLabel}
                    placeholder={t.contact.namePlaceholder}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                  <Input
                    label={t.contact.emailLabel}
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <Input
                  label={t.contact.subjectLabel}
                  placeholder={t.contact.subjectPlaceholder}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />

                <Textarea
                  label={t.contact.messageLabel}
                  placeholder={t.contact.messagePlaceholder}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  required
                />

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto px-8 gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? t.contact.sendingButton : t.contact.sendButton}</span>
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
