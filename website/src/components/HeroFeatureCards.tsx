"use client";

import React, { useState, useEffect } from "react";
import { Cpu, Layers, Atom, Share2, Sparkles, ArrowUpRight } from "lucide-react";

export default function HeroFeatureCards() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 relative">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* ====================================================================
            CARD 1: Quantum Algorithms
        ==================================================================== */}
        <a
          href="#tracks"
          onMouseEnter={() => setHoveredIdx(0)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`glass-panel rounded-2xl p-4.5 flex flex-col justify-between border transition-all duration-300 group cursor-pointer relative overflow-hidden ${
            hoveredIdx === 0
              ? "border-cyan-400 bg-[#0c1c38]/90 -translate-y-2 shadow-[0_12px_35px_-5px_rgba(56,189,248,0.4),0_0_20px_rgba(56,189,248,0.2)]"
              : "border-cyan-500/20 hover:border-cyan-400/40"
          }`}
        >
          {/* Animated background laser circuit on hover */}
          {hoveredIdx === 0 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl" />
            </div>
          )}

          <div className="flex items-start gap-3.5 relative z-10">
            {/* Dynamic Animated Chip Icon */}
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 relative ${
                hoveredIdx === 0
                  ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 scale-110 shadow-[0_0_20px_#38bdf8]"
                  : "bg-cyan-950/60 border-cyan-400/40 text-cyan-400"
              }`}
            >
              <Cpu className={`w-6 h-6 transition-transform duration-300 ${hoveredIdx === 0 ? "rotate-90 scale-110" : ""}`} />

              {/* Radiating micro-pins firing current on hover */}
              {hoveredIdx === 0 && (
                <>
                  <span className="absolute -top-1 left-2 w-1 h-1 rounded-full bg-cyan-300 animate-ping" />
                  <span className="absolute -bottom-1 right-2 w-1 h-1 rounded-full bg-cyan-300 animate-ping" />
                </>
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4
                  className={`text-sm font-bold tracking-wide transition-colors ${
                    hoveredIdx === 0 ? "text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]" : "text-white"
                  }`}
                >
                  Quantum Algorithms
                </h4>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 text-cyan-400 transition-all ${
                    hoveredIdx === 0 ? "opacity-100 translate-x-0.5 -translate-y-0.5" : "opacity-0"
                  }`}
                />
              </div>

              <p className="text-xs text-slate-400 leading-snug mt-0.5">
                Foundations, complexity and new algorithmic paradigms
              </p>
            </div>
          </div>

          {/* Dynamic Expandable Micro-Badge on Hover */}
          <div
            className={`overflow-hidden transition-all duration-300 ${
              hoveredIdx === 0 ? "max-h-8 opacity-100 mt-3 pt-2 border-t border-cyan-500/30" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                O(√N) Quadratic Speedup
              </span>
              <span className="text-slate-400 font-semibold">Track 01 →</span>
            </div>
          </div>
        </a>

        {/* ====================================================================
            CARD 2: Quantum Hardware
        ==================================================================== */}
        <a
          href="#tracks"
          onMouseEnter={() => setHoveredIdx(1)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`glass-panel rounded-2xl p-4.5 flex flex-col justify-between border transition-all duration-300 group cursor-pointer relative overflow-hidden ${
            hoveredIdx === 1
              ? "border-purple-400 bg-[#161233]/90 -translate-y-2 shadow-[0_12px_35px_-5px_rgba(139,92,246,0.4),0_0_20px_rgba(139,92,246,0.2)]"
              : "border-purple-500/20 hover:border-purple-400/40"
          }`}
        >
          {hoveredIdx === 1 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
            </div>
          )}

          <div className="flex items-start gap-3.5 relative z-10">
            {/* Dynamic Animated Layers Icon */}
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 relative ${
                hoveredIdx === 1
                  ? "bg-purple-950/80 border-purple-400 text-purple-300 scale-110 shadow-[0_0_20px_#8b5cf6]"
                  : "bg-purple-950/60 border-purple-400/40 text-purple-400"
              }`}
            >
              <div className="relative">
                <Layers
                  className={`w-6 h-6 transition-transform duration-300 ${
                    hoveredIdx === 1 ? "-translate-y-1 scale-110" : ""
                  }`}
                />
                {hoveredIdx === 1 && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-cyan-400 shadow-[0_0_6px_#38bdf8] rounded-full animate-pulse" />
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4
                  className={`text-sm font-bold tracking-wide transition-colors ${
                    hoveredIdx === 1 ? "text-purple-300 drop-shadow-[0_0_8px_#c084fc]" : "text-white"
                  }`}
                >
                  Quantum Hardware
                </h4>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 text-purple-400 transition-all ${
                    hoveredIdx === 1 ? "opacity-100 translate-x-0.5 -translate-y-0.5" : "opacity-0"
                  }`}
                />
              </div>

              <p className="text-xs text-slate-400 leading-snug mt-0.5">
                QEC, architectures and quantum software
              </p>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              hoveredIdx === 1 ? "max-h-8 opacity-100 mt-3 pt-2 border-t border-purple-500/30" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                15 mK Cryo-Stack &amp; QEC
              </span>
              <span className="text-slate-400 font-semibold">Track 02 →</span>
            </div>
          </div>
        </a>

        {/* ====================================================================
            CARD 3: Applications
        ==================================================================== */}
        <a
          href="#tracks"
          onMouseEnter={() => setHoveredIdx(2)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`glass-panel rounded-2xl p-4.5 flex flex-col justify-between border transition-all duration-300 group cursor-pointer relative overflow-hidden ${
            hoveredIdx === 2
              ? "border-cyan-400 bg-[#0c1c38]/90 -translate-y-2 shadow-[0_12px_35px_-5px_rgba(56,189,248,0.4),0_0_20px_rgba(56,189,248,0.2)]"
              : "border-cyan-500/20 hover:border-cyan-400/40"
          }`}
        >
          {hoveredIdx === 2 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-xl" />
            </div>
          )}

          <div className="flex items-start gap-3.5 relative z-10">
            {/* Dynamic Spinning Atom Icon */}
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 relative ${
                hoveredIdx === 2
                  ? "bg-cyan-950/80 border-cyan-400 text-cyan-300 scale-110 shadow-[0_0_20px_#38bdf8]"
                  : "bg-cyan-950/60 border-cyan-400/40 text-cyan-400"
              }`}
            >
              <Atom
                className={`w-6 h-6 transition-transform duration-700 ${
                  hoveredIdx === 2 ? "rotate-180 scale-115 text-white" : ""
                }`}
              />

              {hoveredIdx === 2 && (
                <span className="absolute inset-0 rounded-xl border border-cyan-300/40 animate-ping pointer-events-none" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4
                  className={`text-sm font-bold tracking-wide transition-colors ${
                    hoveredIdx === 2 ? "text-cyan-300 drop-shadow-[0_0_8px_#38bdf8]" : "text-white"
                  }`}
                >
                  Applications
                </h4>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 text-cyan-400 transition-all ${
                    hoveredIdx === 2 ? "opacity-100 translate-x-0.5 -translate-y-0.5" : "opacity-0"
                  }`}
                />
              </div>

              <p className="text-xs text-slate-400 leading-snug mt-0.5">
                From communication to computation and beyond
              </p>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              hoveredIdx === 2 ? "max-h-8 opacity-100 mt-3 pt-2 border-t border-cyan-500/30" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-cyan-400" />
                VQE • Drug Design • Finance
              </span>
              <span className="text-slate-400 font-semibold">Track 03 →</span>
            </div>
          </div>
        </a>

        {/* ====================================================================
            CARD 4: Quantum Frontiers
        ==================================================================== */}
        <a
          href="#tracks"
          onMouseEnter={() => setHoveredIdx(3)}
          onMouseLeave={() => setHoveredIdx(null)}
          className={`glass-panel rounded-2xl p-4.5 flex flex-col justify-between border transition-all duration-300 group cursor-pointer relative overflow-hidden ${
            hoveredIdx === 3
              ? "border-purple-400 bg-[#161233]/90 -translate-y-2 shadow-[0_12px_35px_-5px_rgba(139,92,246,0.4),0_0_20px_rgba(139,92,246,0.2)]"
              : "border-purple-500/20 hover:border-purple-400/40"
          }`}
        >
          {hoveredIdx === 3 && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-400 to-transparent animate-pulse" />
              <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-xl" />
            </div>
          )}

          <div className="flex items-start gap-3.5 relative z-10">
            {/* Dynamic Animated Network Nodes Icon */}
            <div
              className={`w-12 h-12 rounded-xl border flex items-center justify-center flex-shrink-0 transition-all duration-300 relative ${
                hoveredIdx === 3
                  ? "bg-purple-950/80 border-purple-400 text-purple-300 scale-110 shadow-[0_0_20px_#8b5cf6]"
                  : "bg-purple-950/60 border-purple-400/40 text-purple-400"
              }`}
            >
              <Share2
                className={`w-6 h-6 transition-transform duration-300 ${
                  hoveredIdx === 3 ? "scale-115 rotate-12 text-white" : ""
                }`}
              />

              {hoveredIdx === 3 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] animate-ping" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <h4
                  className={`text-sm font-bold tracking-wide transition-colors ${
                    hoveredIdx === 3 ? "text-purple-300 drop-shadow-[0_0_8px_#c084fc]" : "text-white"
                  }`}
                >
                  Quantum Frontiers
                </h4>
                <ArrowUpRight
                  className={`w-3.5 h-3.5 text-purple-400 transition-all ${
                    hoveredIdx === 3 ? "opacity-100 translate-x-0.5 -translate-y-0.5" : "opacity-0"
                  }`}
                />
              </div>

              <p className="text-xs text-slate-400 leading-snug mt-0.5">
                ML, cryptography, sensing and real-world impact
              </p>
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              hoveredIdx === 3 ? "max-h-8 opacity-100 mt-3 pt-2 border-t border-purple-500/30" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex items-center justify-between text-[10px] font-mono text-purple-300">
              <span className="flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5 text-purple-400" />
                QML • QKD • Quantum Net
              </span>
              <span className="text-slate-400 font-semibold">Track 04 &amp; 05 →</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
}
