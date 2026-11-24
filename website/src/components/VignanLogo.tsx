import React from "react";

interface VignanLogoProps {
  className?: string;
  showSubtitle?: boolean;
}

export default function VignanLogo({ className = "", showSubtitle = true }: VignanLogoProps) {
  return (
    <div className={`flex items-center gap-3.5 select-none ${className}`}>
      {/* Official Vignan University Logo */}
      <div className="relative bg-white/95 rounded-xl px-2.5 py-1 shadow-[0_0_20px_rgba(255,255,255,0.18)] flex items-center justify-center border border-white/30 transition-transform duration-200 hover:scale-[1.02]">
        <img
          src="/images/vignan-logo.png"
          alt="Vignan's Foundation for Science, Technology & Research Logo"
          className="h-8 sm:h-9 w-auto object-contain"
        />
      </div>

      {/* Divider and Symposium Title */}
      {showSubtitle && (
        <div className="hidden lg:flex items-center gap-3 pl-3 border-l border-slate-700/60">
          <div className="flex flex-col">
            <span className="text-[11px] font-semibold text-cyan-300 tracking-wide uppercase font-mono">
              National Symposium on
            </span>
            <span className="text-xs font-bold text-slate-100 tracking-wide">
              Quantum Computing, Applications and Algorithms
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
