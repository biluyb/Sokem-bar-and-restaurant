"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Calendar as CalendarIcon, Clock, Users, CheckCircle2, AlertCircle, Sparkles, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { SOKEM_CONFIG } from "@/config/site";

const TIME_SLOTS = [
  "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM", "2:00 PM",
  "5:30 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
  "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
];

export default function ReservationsPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!date) {
      setErrorMessage("Please choose a reservation date.");
      return;
    }
    if (!timeSlot) {
      setErrorMessage("Please select a dining time slot.");
      return;
    }
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!phone.trim()) {
      setErrorMessage("Please provide a contact phone number.");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      const code = `SKM-${Math.floor(100000 + Math.random() * 900000)}`;
      setConfirmationCode(code);
      setIsSuccess(true);
    }, 700);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-28 space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-gold/15 border border-gold/30 text-gold text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Online Reservations</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white tracking-tight">
          Book a Table at Sokem
        </h1>
        <p className="text-gray-300 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
          Reserve your dining experience online or call us directly at{" "}
          <a href={`tel:${SOKEM_CONFIG.phone.replace(/\s+/g, "")}`} className="text-gold font-semibold hover:underline">
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
          className="luminous-card p-8 sm:p-12 text-center space-y-6 max-w-xl mx-auto border border-gold/40 rounded-3xl"
        >
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="font-serif text-3xl font-bold text-white">
              Reservation Confirmed!
            </h2>
            <p className="text-sm text-gray-300">
              We look forward to welcoming you. A confirmation was sent to{" "}
              <span className="text-gold font-semibold">{email}</span>.
            </p>
          </div>

          <div className="bg-canvas-lighter rounded-2xl p-5 border border-white/[0.1] text-left space-y-2.5 text-sm">
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-gray-400">Confirmation Code:</span>
              <span className="font-mono text-gold font-bold">{confirmationCode}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-gray-400">Guest Name:</span>
              <span className="text-white font-medium">{name}</span>
            </div>
            <div className="flex justify-between border-b border-white/[0.08] pb-2">
              <span className="text-gray-400">Party Size:</span>
              <span className="text-white font-medium">{partySize} Guests</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Date & Time:</span>
              <span className="text-white font-medium">{date} at {timeSlot}</span>
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
            Make Another Booking
          </Button>
        </motion.div>
      ) : (
        /* Simple, Clean Booking Form */
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {errorMessage && (
            <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-800/80 text-rose-300 text-sm flex items-center gap-3">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. Party Size */}
          <div className="luminous-card p-6 sm:p-8 rounded-3xl space-y-4">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-gold" />
              1. Select Party Size
            </label>
            <div className="flex flex-wrap gap-2.5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 10, 12].map((size) => (
                <button
                  type="button"
                  key={size}
                  onClick={() => setPartySize(size)}
                  className={`w-12 h-12 rounded-2xl text-sm font-bold transition-all ${
                    partySize === size
                      ? "bg-gold text-slate-950 shadow-glow scale-105"
                      : "bg-canvas-lighter text-gray-300 hover:text-white border border-white/[0.1] hover:border-gold/30"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Date & Time */}
          <div className="luminous-card p-6 sm:p-8 rounded-3xl space-y-6">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-200 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4 text-gold" />
              2. Choose Date & Seating Time
            </label>

            <div className="max-w-xs">
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="w-full px-4 py-3 rounded-xl bg-canvas-lighter border border-white/[0.12] text-white focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-sm"
              />
            </div>

            <div className="space-y-2">
              <span className="text-xs text-gray-400 font-medium flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-gold" />
                Available Time Slots
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all ${
                      timeSlot === slot
                        ? "bg-gold text-slate-950 shadow-glow"
                        : "bg-canvas-lighter text-gray-300 hover:text-white border border-white/[0.08]"
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. Contact Details */}
          <div className="luminous-card p-6 sm:p-8 rounded-3xl space-y-4">
            <label className="text-sm font-semibold uppercase tracking-wider text-gray-200 block border-b border-white/[0.1] pb-3">
              3. Guest Information
            </label>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Your Name *"
                placeholder="e.g. Michael Smith"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Input
                label="Email *"
                type="email"
                placeholder="michael@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Phone Number *"
                type="tel"
                placeholder="093 001 4033"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <Textarea
              label="Special Requests (Optional)"
              placeholder="e.g. Window table, anniversary celebration, allergy notes..."
              value={specialNotes}
              onChange={(e) => setSpecialNotes(e.target.value)}
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <p className="text-xs text-gray-400">
              * Tables are held for 15 minutes past the booking time.
            </p>
            <Button
              type="submit"
              variant="primary"
              size="lg"
              isLoading={isSubmitting}
              className="w-full sm:w-auto"
            >
              Confirm Table Reservation
            </Button>
          </div>
        </motion.form>
      )}
    </div>
  );
}
