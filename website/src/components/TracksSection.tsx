"use client";

import React, { useState } from "react";
import {
  Layers,
  ArrowRight,
  X,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { TechnicalTrack } from "@/lib/types";
import {
  AlgorithmLatticeVisual,
  HardwareChipVisual,
  QuantumLayersVisual,
  NeuralNetworkVisual,
  EntangledQubitsVisual,
} from "./InteractiveTrackVisual";
import HeroQuantumWave from "./HeroQuantumWave";

const TRACKS_DATA: TechnicalTrack[] = [
  {
    id: 1,
    title: "Quantum Algorithms & Complexity",
    subtitle: "Theoretical Foundations & Quantum Advantage",
    description:
      "Algorithms, complexity theory, oracle constructions and quantum computational bounds.",
    topics: [
      "Quantum Fourier Transform and Shor-based variations",
      "Grover Search and Quantum Amplitude Amplification",
      "Variational Quantum Eigensolvers (VQE) and QAOA",
      "Quantum Walk models and Hamiltonian Simulation",
      "BQP Complexity classes and Quantum Supremacy limits",
      "Oracle-based lower bounds and query complexity",
    ],
    iconType: "algorithms",
    accentColor: "from-cyan-500/25 to-blue-600/35",
  },
  {
    id: 2,
    title: "Quantum Hardware, QEC & Software",
    subtitle: "Physical Platforms, Fault-Tolerance & Compilers",
    description:
      "Quantum hardware platforms, quantum error correction, compilers and software stacks.",
    topics: [
      "Superconducting transmon qubit architectures",
      "Trapped-ion, neutral atom, and photonic quantum processors",
      "Surface codes, Bacon-Shor codes, and color codes",
      "Fault-tolerant threshold theorems and magic state distillation",
      "Quantum transpilers, pulse-level control, and circuit optimization",
      "Qiskit, Cirq, PennyLane, and open-source quantum toolchains",
    ],
    iconType: "hardware",
    accentColor: "from-purple-500/25 to-indigo-600/35",
  },
  {
    id: 3,
    title: "Quantum Applications",
    subtitle: "Domain-Specific Breakthroughs & Industrial Use-Cases",
    description:
      "Applications in chemistry, optimization, sensing, finance, materials and other domain-specific area.",
    topics: [
      "Molecular dynamics simulation and catalyst discovery",
      "High-temperature superconductor and battery materials discovery",
      "Combinatorial logistics, route optimization, and supply chain",
      "Portfolio optimization, risk modeling, and arbitrage in finance",
      "Quantum gravimetry, magnetometry, and atomic clocks",
      "Energy grid management and aerospace aerodynamics simulation",
    ],
    iconType: "applications",
    accentColor: "from-blue-500/25 to-cyan-600/35",
  },
  {
    id: 4,
    title: "Quantum Machine Learning",
    subtitle: "Hybrid Quantum-Classical AI & Data Models",
    description:
      "Quantum machine learning models, algorithms and hybrid quantum-classical approaches.",
    topics: [
      "Parameterized Quantum Circuits (PQC) and Quantum Neural Networks",
      "Quantum Kernel Methods and Quantum Support Vector Machines",
      "Barren plateaus mitigation and barren landscape diagnostics",
      "Quantum Generative Adversarial Networks (QGANs)",
      "Quantum Reinforcement Learning for dynamic decision making",
      "Hybrid classical-quantum foundation models",
    ],
    iconType: "ml",
    accentColor: "from-indigo-500/25 to-purple-600/35",
  },
  {
    id: 5,
    title: "Quantum Communication & Cryptography",
    subtitle: "Quantum Internet, Entanglement & Post-Quantum Security",
    description:
      "Quantum key distribution, secure communication, quantum networks and post-quantum aspects.",
    topics: [
      "Discrete-variable and continuous-variable Quantum Key Distribution (QKD)",
      "Satellite-to-ground quantum communications and space payloads",
      "Quantum repeaters and quantum memory interfaces",
      "Quantum teleportation protocols and entanglement swapping",
      "NIST Post-Quantum Cryptography (PQC) transition frameworks",
      "Lattice-based, code-based, and isogeny-based quantum resistance",
    ],
    iconType: "communication",
    accentColor: "from-sky-500/25 to-violet-600/35",
  },
];

export default function TracksSection() {
  const [selectedTrack, setSelectedTrack] = useState<TechnicalTrack | null>(null);
  const [hoveredTrackId, setHoveredTrackId] = useState<number | null>(null);

  return (
    <section id="tracks" className="relative py-24 overflow-hidden border-t border-slate-800/40">
      {/* Background ambient light */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[600px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Undulating Wavy Quantum Ribbon across the top of Tracks (from Slide 2) */}
      <div className="absolute top-0 left-0 right-0 opacity-40 pointer-events-none">
        <HeroQuantumWave height={160} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Layers className="w-4 h-4 text-cyan-400" />
            <span>Technical Tracks</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Technical{" "}
            <span className="font-serif italic bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Tracks
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            The symposium will feature technical sessions across the following thematic tracks, covering foundational advances, enabling technologies and real-world applications in quantum computing.
          </p>

          <p className="mt-2 text-xs font-mono text-cyan-300/80 bg-cyan-950/30 px-3 py-1 rounded-full border border-cyan-500/20">
            Hover over any track card to trigger its interactive quantum simulation
          </p>
        </div>

        {/* 5 Track Cards Grid with Custom Interactive Hover Simulations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {TRACKS_DATA.map((track) => {
            const isHovered = hoveredTrackId === track.id;

            return (
              <div
                key={track.id}
                onMouseEnter={() => setHoveredTrackId(track.id)}
                onMouseLeave={() => setHoveredTrackId(null)}
                onClick={() => setSelectedTrack(track)}
                className={`glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col justify-between cursor-pointer border transition-all duration-300 group relative overflow-hidden ${
                  isHovered
                    ? "border-cyan-400/60 shadow-[0_10px_35px_-5px_rgba(56,189,248,0.35),0_0_25px_rgba(139,92,246,0.25)] -translate-y-1.5"
                    : "border-cyan-500/20 hover:border-cyan-400/40"
                }`}
              >
                {/* Ambient glow in card corner */}
                <div
                  className={`absolute -top-12 -right-12 w-36 h-36 rounded-full bg-gradient-to-br ${track.accentColor} blur-2xl transition-transform duration-500 pointer-events-none ${
                    isHovered ? "scale-150 opacity-100" : "scale-100 opacity-60"
                  }`}
                />

                <div>
                  {/* Interactive Visual Canvas Container */}
                  <div className="mb-4 flex items-center justify-center p-2 rounded-2xl bg-[#081226]/80 border border-slate-800 group-hover:border-cyan-400/40 transition-colors shadow-inner">
                    {track.id === 1 && (
                      <AlgorithmLatticeVisual isHovered={isHovered} />
                    )}
                    {track.id === 2 && (
                      <HardwareChipVisual isHovered={isHovered} />
                    )}
                    {track.id === 3 && (
                      <QuantumLayersVisual isHovered={isHovered} />
                    )}
                    {track.id === 4 && (
                      <NeuralNetworkVisual isHovered={isHovered} />
                    )}
                    {track.id === 5 && (
                      <EntangledQubitsVisual isHovered={isHovered} />
                    )}
                  </div>

                  {/* Title */}
                  <h3
                    className={`text-lg font-bold leading-snug mb-3 transition-colors ${
                      isHovered ? "text-cyan-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]" : "text-white"
                    }`}
                  >
                    {track.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {track.description}
                  </p>
                </div>

                {/* Bottom Action Arrow Pill */}
                <div className="pt-6 flex items-center justify-between border-t border-slate-800/60 mt-4">
                  <span className="text-[11px] font-mono text-cyan-400/80 group-hover:text-cyan-300 font-semibold tracking-wider">
                    Track 0{track.id}
                  </span>

                  <div
                    className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isHovered
                        ? "bg-cyan-400 text-black border-cyan-300 shadow-[0_0_15px_#38bdf8] rotate-[-45deg]"
                        : "bg-slate-800/80 text-slate-300 border-slate-700"
                    }`}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Track Details Modal */}
      {selectedTrack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="glass-panel max-w-xl w-full rounded-3xl p-6 sm:p-8 border border-cyan-400/50 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedTrack(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center gap-4 mb-5">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 flex-shrink-0">
                {selectedTrack.id === 1 && <AlgorithmLatticeVisual isHovered={true} />}
                {selectedTrack.id === 2 && <HardwareChipVisual isHovered={true} />}
                {selectedTrack.id === 3 && <QuantumLayersVisual isHovered={true} />}
                {selectedTrack.id === 4 && <NeuralNetworkVisual isHovered={true} />}
                {selectedTrack.id === 5 && <EntangledQubitsVisual isHovered={true} />}
              </div>
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">
                  Track 0{selectedTrack.id}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {selectedTrack.title}
                </h3>
                <p className="text-xs text-purple-300 font-medium mt-0.5">
                  {selectedTrack.subtitle}
                </p>
              </div>
            </div>

            <p className="text-sm text-slate-300 mb-6 leading-relaxed">
              {selectedTrack.description}
            </p>

            {/* In-depth Scope & Topics */}
            <h4 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Key Topics &amp; Research Themes</span>
            </h4>

            <div className="space-y-2 mb-6 max-h-60 overflow-y-auto pr-1">
              {selectedTrack.topics.map((t, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800"
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-xs text-slate-200">{t}</span>
                </div>
              ))}
            </div>

            {/* Footer Buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 font-mono">
                Call for papers to be announced
              </span>
              <a
                href="#registration"
                onClick={() => setSelectedTrack(null)}
                className="quantum-btn-gradient text-white text-xs font-semibold px-5 py-2.5 rounded-full"
              >
                Register For This Track
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
