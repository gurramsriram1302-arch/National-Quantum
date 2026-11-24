"use client";

import React from "react";
import BlochSphere3D from "./BlochSphere3D";
import { Atom, Users, FlaskConical, Share2, Compass, Target, Lightbulb, Sparkles } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="relative py-24 overflow-hidden border-t border-slate-800/40">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header Badge */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Atom className="w-4 h-4 text-cyan-400" />
            <span>About The Symposium</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            About the{" "}
            <span className="font-serif italic bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Symposium
            </span>
          </h2>
        </div>

        {/* Content Grid: Left 3D Bloch Sphere, Right Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Interactive Bloch Sphere */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            <div className="relative">
              <BlochSphere3D size={420} showLabels={true} variant="bloch" />
              
              {/* Formula Callout Tag */}
              <div className="absolute top-12 right-0 glass-panel px-3.5 py-1.5 rounded-lg border border-cyan-500/30 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
                <span className="font-mono text-xs text-cyan-300 font-bold">
                  α|0⟩ + β|1⟩
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-2 text-center">
              State vector superposition in Hilbert space
            </p>
          </div>

          {/* Right Column: Narrative & Highlights */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
              The{" "}
              <strong className="text-white font-semibold">
                National Symposium on Quantum Computing, Applications and Algorithms
              </strong>{" "}
              brings together researchers, academicians, industry experts and students to
              discuss recent advances, challenges and future directions in quantum computing
              and its emerging applications.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Hosted by <strong className="text-slate-200">Vignan&apos;s Foundation for Science, Technology &amp; Research</strong>, this flagship symposium serves as a national nexus for quantum science. Participants will gain deep insights into quantum circuit complexity, error correction architectures, hybrid classical-quantum machine learning models, and secure post-quantum communication protocols.
            </p>

            {/* 3 Circular Badges matching Image 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {/* Badge 1 */}
              <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center gap-3 border border-cyan-500/20 hover:border-cyan-400/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-cyan-950/70 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Exchange Ideas</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Connect across domains with pioneering quantum thinkers
                  </p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center gap-3 border border-blue-500/20 hover:border-blue-400/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-blue-950/70 border border-blue-400/50 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <FlaskConical className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Showcase Research</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Present rigorous technical findings and new algorithm designs
                  </p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="glass-panel rounded-2xl p-4 flex flex-col items-center text-center gap-3 border border-purple-500/20 hover:border-purple-400/40 transition-colors">
                <div className="w-12 h-12 rounded-full bg-purple-950/70 border border-purple-400/50 flex items-center justify-center text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <Share2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Foster Collaborations</h4>
                  <p className="text-xs text-slate-400 mt-1">
                    Bridge institutional and industry efforts for national quantum initiatives
                  </p>
                </div>
              </div>
            </div>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                <Target className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-300">
                  <strong className="text-white">National Quantum Mission Alignment:</strong> Accelerating sovereign capabilities in quantum hardware and software.
                </span>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/40 border border-slate-800">
                <Lightbulb className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs text-slate-300">
                  <strong className="text-white">Interdisciplinary Cross-Pollination:</strong> Uniting physics, computer science, mathematics, and engineering.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
