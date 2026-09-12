"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { SOKEM_CONFIG } from "@/config/site";
import { useLanguage } from "@/components/ui/LanguageContext";

const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
];

export default function ReservationsPage() {
  const { t } = useLanguage();
  const [partySize, setPartySize] = useState<number>(2);
  const [date, setDate] = useState<string>("");
  const [timeSlot, setTimeSlot] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [specialNotes, setSpecialNotes] = useState<string>("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!date) {
      setErrorMessage(t.reservations.dateRequired);
      return;
    }
    if (!timeSlot) {
      setErrorMessage(t.reservations.timeRequired);
      return;
    }
    if (!name.trim()) {
      setErrorMessage(t.reservations.nameRequired);
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage(t.reservations.emailRequired);
      return;
    }
    if (!phone.trim()) {
      setErrorMessage(t.reservations.phoneRequired);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: name,
          email,
          phone,
          partySize,
          date,
          timeSlot,
          specialNotes,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit reservation.");
      }

      setConfirmationCode(data.bookingCode || `SKM-${Math.floor(100000 + Math.random() * 900000)}`);
      setIsSuccess(true);
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to submit reservation. Please try again.";
      setErrorMessage(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-12 pb-24 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-amber-600/30 dark:border-gold/30 text-amber-900 dark:text-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.reservations.badge}</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
          {t.reservations.title}
        </h1>
        <p className="text-slate-600 dark:text-gray-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          {t.reservations.subtitle}{" "}
          <a href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`} className="text-amber-700 dark:text-gold font-semibold hover:underline">
            {SOKEM_CONFIG.phone}
          </a>.
        </p>
      </motion.div>

      {isSuccess ? (
        /* Confirmation Card */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="luminous-card p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto border border-amber-500/40 dark:border-gold/40 rounded-3xl"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-serif text-2xl font-bold text-slate-900 dark:text-white">
              {t.reservations.successTitle}
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-300">
              {t.reservations.successMessage}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/[0.1] text-xs space-y-2 text-left">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.reservations.bookingCode}:</span>
              <span className="font-mono font-bold text-amber-700 dark:text-gold">{confirmationCode}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.reservations.fullName}:</span>
              <span className="text-slate-900 dark:text-white font-medium">{name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.reservations.stepPartySize}:</span>
              <span className="text-slate-900 dark:text-white font-medium">{partySize} {t.reservations.guests}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-gray-400">{t.reservations.stepDateTime}:</span>
              <span className="text-slate-900 dark:text-white font-medium">{date} @ {timeSlot}</span>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => {
              setIsSuccess(false);
              setDate("");
              setTimeSlot("");
              setSpecialNotes("");
            }}
          >
            {t.reservations.makeAnother}
          </Button>
        </motion.div>
      ) : (
        /* Booking Form */
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/80 text-rose-800 dark:text-rose-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Party Size */}
          <div className="luminous-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4">
            <label className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-gray-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-amber-600 dark:text-gold" />
              {t.reservations.stepPartySize}
            </label>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setPartySize(size)}
                  className={`w-full h-11 sm:h-12 rounded-xl sm:rounded-2xl text-sm font-bold flex items-center justify-center transition-all cursor-pointer ${
                    partySize === size
                      ? "bg-gold text-slate-950 shadow-sm scale-105"
                      : "bg-slate-100 dark:bg-canvas-lighter text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.1] hover:border-amber-500/40 dark:hover:border-gold/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date & Time */}
          <div className="luminous-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-6">
            <label className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-gray-200 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-amber-600 dark:text-gold" />
              {t.reservations.stepDateTime}
            </label>

            <div className="w-full sm:max-w-xs">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl bg-white dark:bg-canvas-lighter border border-slate-300 dark:border-white/[0.12] text-slate-900 dark:text-white focus:outline-none focus:border-amber-500 dark:focus:border-gold focus:ring-1 focus:ring-amber-500 dark:focus:ring-gold text-base sm:text-sm shadow-sm"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs text-slate-600 dark:text-gray-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-gold" />
                {t.reservations.timeSlots}
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2.5 px-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      timeSlot === slot
                        ? "bg-gold text-slate-950 shadow-sm"
                        : "bg-slate-100 dark:bg-canvas-lighter text-slate-700 dark:text-gray-300 hover:text-slate-950 dark:hover:text-white border border-slate-200 dark:border-white/[0.08]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Contact Details */}
          <div className="luminous-card p-5 sm:p-8 rounded-2xl sm:rounded-3xl space-y-4">
            <label className="text-sm font-semibold uppercase tracking-wider text-slate-800 dark:text-gray-200 block">
              {t.reservations.stepContact}
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label={t.reservations.fullName}
                placeholder={t.reservations.fullNamePlaceholder}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label={t.reservations.emailAddress}
                type="email"
                placeholder={t.reservations.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Input
              label={t.reservations.phoneNumber}
              type="tel"
              placeholder={t.reservations.phonePlaceholder}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            <Textarea
              label={t.reservations.specialNotes}
              placeholder={t.reservations.specialNotesPlaceholder}
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit */}
          <div className="text-center pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full sm:w-auto px-12 font-bold text-base min-h-[48px]"
            >
              {isSubmitting ? t.reservations.submitting : t.reservations.submitButton}
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
