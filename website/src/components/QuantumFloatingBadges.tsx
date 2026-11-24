"use client";

import React from "react";
import { Cpu, Sparkles } from "lucide-react";

export function QuantumEquationBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`glass-panel rounded-xl px-4 py-2.5 flex items-center gap-2 border border-cyan-500/30 shadow-[0_0_20px_rgba(56,189,248,0.2)] animate-float ${className}`}
    >
      <span className="font-mono text-sm tracking-wider text-cyan-300 font-semibold">
        |ψ⟩ = α|0⟩ + β|1⟩
      </span>
    </div>
  );
}

export function QuantumCircuitBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`glass-panel rounded-xl p-3 border border-purple-500/30 shadow-[0_0_25px_rgba(139,92,246,0.2)] select-none ${className}`}
      style={{ animation: "float-subtle 7s ease-in-out infinite 1s" }}
    >
      <div className="flex flex-col gap-2 font-mono text-xs">
        {/* Qubit 0 with Hadamard and CNOT Control */}
        <div className="flex items-center gap-1.5 text-slate-300">
          <span className="text-cyan-400 font-bold">|0⟩</span>
          <div className="w-3 h-[1px] bg-cyan-500/60" />
          <div className="w-6 h-6 rounded bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-400/50 flex items-center justify-center text-[10px] font-bold text-cyan-200">
            H
          </div>
          <div className="w-4 h-[1px] bg-cyan-500/60" />
          <div className="relative flex items-center justify-center">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
            <div className="absolute top-2 w-[1px] h-6 bg-cyan-400/80" />
          </div>
          <div className="w-4 h-[1px] bg-cyan-500/60" />
        </div>

        {/* Qubit 1 with CNOT Target */}
        <div className="flex items-center gap-1.5 text-slate-300 mt-1">
          <span className="text-purple-400 font-bold">|0⟩</span>
          <div className="w-13 h-[1px] bg-purple-500/60" />
          <div className="w-5 h-5 rounded-full border border-purple-400 flex items-center justify-center text-purple-300 font-bold text-xs shadow-[0_0_8px_#a855f7]">
            ⊕
          </div>
          <div className="w-4 h-[1px] bg-purple-500/60" />
        </div>
      </div>
    </div>
  );
}

export function QuantumProcessorBadge({ className = "" }: { className?: string }) {
  return (
    <div
      className={`glass-panel rounded-2xl p-3 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_25px_rgba(56,189,248,0.25)] ${className}`}
      style={{ animation: "float-subtle 8s ease-in-out infinite 2s" }}
    >
      <div className="relative w-12 h-12 rounded-xl bg-[#0a1733] border border-cyan-400/50 flex items-center justify-center">
        {/* Radiating Chip Pins */}
        <div className="absolute -top-1.5 left-2 right-2 flex justify-between">
          <div className="w-1 h-1.5 bg-cyan-400/70 rounded-full" />
          <div className="w-1 h-1.5 bg-cyan-400/70 rounded-full" />
          <div className="w-1 h-1.5 bg-cyan-400/70 rounded-full" />
        </div>
        <div className="absolute -bottom-1.5 left-2 right-2 flex justify-between">
          <div className="w-1 h-1.5 bg-cyan-400/70 rounded-full" />
          <div className="w-1 h-1.5 bg-cyan-400/70 rounded-full" />
          <div className="w-1 h-1.5 bg-cyan-400/70 rounded-full" />
        </div>
        <div className="absolute -left-1.5 top-2 bottom-2 flex flex-col justify-between">
          <div className="w-1.5 h-1 bg-cyan-400/70 rounded-full" />
          <div className="w-1.5 h-1 bg-cyan-400/70 rounded-full" />
          <div className="w-1.5 h-1 bg-cyan-400/70 rounded-full" />
        </div>
        <div className="absolute -right-1.5 top-2 bottom-2 flex flex-col justify-between">
          <div className="w-1.5 h-1 bg-cyan-400/70 rounded-full" />
          <div className="w-1.5 h-1 bg-cyan-400/70 rounded-full" />
          <div className="w-1.5 h-1 bg-cyan-400/70 rounded-full" />
        </div>

        <span className="font-mono font-black text-xl text-cyan-300 drop-shadow-[0_0_10px_#38bdf8]">
          Q
        </span>
      </div>
    </div>
  );
}
