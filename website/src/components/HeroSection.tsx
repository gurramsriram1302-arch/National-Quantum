"use client";

import React from "react";
import QuantumHeroGlobe from "./QuantumHeroGlobe";
import HeroQuantumWave from "./HeroQuantumWave";
import {
  QuantumEquationBadge,
  QuantumCircuitBadge,
  QuantumProcessorBadge,
} from "./QuantumFloatingBadges";
import HeroFeatureCards from "./HeroFeatureCards";
import { Calendar, MapPin, ArrowRight, Play } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-12 flex flex-col justify-between overflow-hidden"
    >
      {/* Background ambient radial glow matching PPT */}
      <div className="absolute top-1/4 right-1/4 w-[550px] h-[550px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[150px] pointer-events-none" />

      {/* Main Top Area: Left Text & Right Quantum Rotating Globe */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 pt-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Title & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            {/* National Symposium Super-title */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_12px_rgba(56,189,248,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              National Level Academic &amp; Technical Symposium
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Explore the <br />
              <span className="bg-gradient-to-r from-[#38bdf8] via-[#818cf8] to-[#c084fc] bg-clip-text text-transparent">
                Quantum Frontier.
              </span>
            </h1>

            {/* Sub-tagline with vertical cyan accent bar */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-7 bg-cyan-400 rounded-full shadow-[0_0_12px_#38bdf8]" />
              <p className="text-lg sm:text-xl font-medium text-slate-200 tracking-wide">
                Where computation meets possibility.
              </p>
            </div>

            {/* Event Title & Subtitle */}
            <p className="text-sm sm:text-base text-slate-400 max-w-xl leading-relaxed">
              National Symposium on Quantum Computing, Applications and Algorithms
            </p>

            {/* Event Metadata Badges */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              {/* Date Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="text-sm font-semibold text-white tracking-wide">
                  28–29 December 2026
                </span>
              </div>

              {/* Venue Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/60 border border-slate-700/60 text-slate-300 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                <span>Vignan&apos;s Foundation for Science, Technology &amp; Research</span>
              </div>
            </div>

            {/* Call To Actions */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <a
                href="#registration"
                className="quantum-btn-gradient text-white text-sm sm:text-base font-semibold px-7 py-3.5 rounded-full flex items-center gap-2 shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all group"
              >
                <span>Register Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#about"
                className="glass-panel text-slate-200 hover:text-white text-sm sm:text-base font-medium px-6 py-3.5 rounded-full flex items-center gap-2 border border-slate-700 hover:border-cyan-400/50 hover:bg-slate-800/50 transition-all"
              >
                <Play className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/30" />
                <span>Explore Symposium</span>
              </a>
            </div>
          </div>

          {/* Right Column: Quantum Globe & Counter-Rotating Rings */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            <div className="relative">
              {/* Rotating Globe with Counter-Rotating Rings */}
              <QuantumHeroGlobe size={500} />

              {/* Floating Equation Tag (Top Right) */}
              <div className="absolute top-2 -right-4 z-20">
                <QuantumEquationBadge />
              </div>

              {/* Floating Quantum Circuit Tag (Middle Left) */}
              <div className="absolute top-1/2 -left-10 -translate-y-1/2 z-20 hidden sm:block">
                <QuantumCircuitBadge />
              </div>

              {/* Floating Quantum Chip Tag (Middle Right) */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 z-20">
                <QuantumProcessorBadge />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Undulating Waving Quantum Ribbon directly under globe & buttons */}
      <div className="relative w-full -my-8 z-10">
        <HeroQuantumWave height={220} />
      </div>

      {/* Bottom Feature Bar (4 Dynamic Cards matching Slide 1 / Image 1) */}
      <HeroFeatureCards />
    </section>
  );
}
