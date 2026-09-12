"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Phone, PhoneCall, Copy, Check, Clock, Utensils } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { SOKEM_CONFIG } from "@/config/site";
import { MenuItem } from "@/types";
import { formatPrice } from "@/lib/utils";
import { useLanguage } from "@/components/ui/LanguageContext";

export interface OrderPhoneModalProps {
  isOpen: boolean;
  onClose: () => void;
  item?: MenuItem | null;
}

export const OrderPhoneModal: React.FC<OrderPhoneModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Strip spaces for tel: protocol (e.g., "093 001 4033" -> "0930014033")
  const telNumber = SOKEM_CONFIG.phone.replace(/\s+/g, "");

  const handleCopy = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(SOKEM_CONFIG.phone);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = SOKEM_CONFIG.phone;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.menu.orderModalTitle}>
      <div className="space-y-6">
        {/* Selected Item Preview (if opened for a specific dish) */}
        {item && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
            {item.imageUrl ? (
              <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 dark:border-slate-700">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-16 h-16 rounded-lg bg-amber-500/10 text-amber-600 dark:text-gold flex items-center justify-center shrink-0">
                <Utensils className="w-6 h-6" />
              </div>
            )}
            <div className="min-w-0 flex-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-600 dark:text-gold">
                {item.categoryName}
              </span>
              <h4 className="font-serif font-bold text-slate-900 dark:text-white truncate">
                {item.title}
              </h4>
              <p className="text-sm font-semibold text-amber-600 dark:text-gold">
                {formatPrice(item.price, item.currency)}
              </p>
            </div>
          </div>
        )}

        <div className="text-center space-y-2">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-gold flex items-center justify-center border border-amber-500/20 shadow-inner">
            <Phone className="w-7 h-7 animate-pulse" />
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {t.menu.orderModalSubtitle}
          </p>
        </div>

        {/* Direct Call & Copy Card */}
        <div className="space-y-3 p-4 rounded-xl bg-gradient-to-b from-amber-50/50 to-transparent dark:from-slate-800/80 dark:to-slate-900/80 border border-amber-200/60 dark:border-amber-500/20">
          <div className="text-center">
            <span className="text-xs uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400">
              {t.menu.kitchenDirect}
            </span>
            <div className="font-serif text-3xl font-extrabold text-slate-950 dark:text-white tracking-wide mt-1">
              {SOKEM_CONFIG.phone}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
            <a
              href={`tel:${telNumber}`}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-slate-950 font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{t.menu.callToOrder}</span>
            </a>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 active:scale-[0.98] text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-600 font-semibold text-sm transition-all cursor-pointer shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                    {t.menu.copied}
                  </span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  <span>{t.menu.copyNumber}</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Operating Hours Notice */}
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 justify-center">
          <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>{t.menu.orderHoursNotice}</span>
        </div>

        <div className="pt-2 flex justify-end">
          <Button variant="outline" size="sm" onClick={onClose}>
            {t.common.close}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
