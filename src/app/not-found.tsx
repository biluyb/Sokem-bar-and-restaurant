import React from "react";
import Link from "next/link";
import { Utensils, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-slate-800 text-center space-y-6 max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-gold/15 border border-gold/30 flex items-center justify-center text-gold mx-auto">
          <Utensils className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <span className="text-xs uppercase font-bold text-gold tracking-widest">
            Error 404
          </span>
          <h1 className="font-heading text-3xl font-bold text-white">
            Page Not Found
          </h1>
          <p className="text-sm text-slate-400">
            The vintage, dish, or destination you are seeking cannot be located in our cellar.
          </p>
        </div>
        <Link href="/">
          <Button variant="primary" className="gap-2">
            <ArrowLeft className="w-4 h-4" />
            Return to Homepage
          </Button>
        </Link>
      </div>
    </div>
  );
}
