"use client";

import React, { useEffect } from "react";
import confetti from "canvas-confetti";
import {
  CheckCircle2,
  Calendar,
  MapPin,
  QrCode,
  Download,
  Share2,
  X,
  Sparkles,
  User,
  Building,
  Tag,
} from "lucide-react";
import { Registration } from "@/lib/types";

interface RegistrationSuccessModalProps {
  registration: Registration;
  onClose: () => void;
}

export default function RegistrationSuccessModal({
  registration,
  onClose,
}: RegistrationSuccessModalProps) {
  useEffect(() => {
    // Launch celebratory confetti burst
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#818cf8", "#c084fc", "#ffffff"],
      });
    } catch {
      // ignore
    }
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="glass-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-cyan-400/50 shadow-[0_0_50px_rgba(56,189,248,0.25)] relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 to-purple-600/30 border border-cyan-400/50 flex items-center justify-center text-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] mb-3">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold text-white">
            Registration Confirmed!
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Welcome to the National Symposium on Quantum Computing 2026.
          </p>
        </div>

        {/* Digital Delegate Pass Card */}
        <div className="rounded-2xl p-5 bg-gradient-to-br from-[#0c1b38] to-[#122247] border border-cyan-500/40 shadow-inner relative overflow-hidden mb-6">
          {/* Holographic background stripe */}
          <div className="absolute top-0 right-0 w-36 h-36 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Card Top: Institution & ID */}
          <div className="flex items-start justify-between pb-4 border-b border-slate-700/60">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 block">
                Official Delegate Pass
              </span>
              <h4 className="text-sm font-bold text-white tracking-wide">
                NSQC 2026
              </h4>
            </div>

            <div className="text-right">
              <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 block">
                Registration ID
              </span>
              <span className="text-sm font-mono font-black text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]">
                {registration.registrationId}
              </span>
            </div>
          </div>

          {/* Card Body: Participant Details */}
          <div className="py-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-purple-400 flex-shrink-0" />
              <span className="text-sm font-bold text-white">
                {registration.fullName}
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Tag className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
              <span>{registration.designation} • {registration.category}</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <Building className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
              <span className="truncate">{registration.institution}</span>
            </div>
          </div>

          {/* Card Bottom: Date & Venue */}
          <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>28–29 Dec 2026</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-purple-400" />
              <span>Vignan&apos;s, Vadlamudi</span>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <p className="text-xs text-slate-400 text-center mb-6 leading-relaxed">
          Please preserve your <strong className="text-cyan-300 font-mono">{registration.registrationId}</strong> for symposium check-in, kit collection, and presentation certificates.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 glass-panel text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-colors border border-slate-700"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Save / Print Pass</span>
          </button>

          <button
            onClick={onClose}
            className="flex-1 quantum-btn-gradient text-white text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5"
          >
            <span>Done</span>
          </button>
        </div>
      </div>
    </div>
  );
}
