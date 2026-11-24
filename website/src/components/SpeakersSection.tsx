"use client";

import React, { useState } from "react";
import {
  Mic,
  Layers,
  GraduationCap,
  Star,
  Users,
  Bell,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  X,
  Send,
  UserCheck,
} from "lucide-react";
import MiniQuantumSphere from "./MiniQuantumSphere";
import PsiProcessorChip from "./PsiProcessorChip";

interface SpeakerCategoryDetail {
  id: string;
  title: string;
  roleDescription: string;
  criteria: string;
  expectedScope: string;
  icon: React.ComponentType<{ className?: string }>;
  borderGlow: string;
  iconColor: string;
}

const SPEAKER_CATEGORIES: SpeakerCategoryDetail[] = [
  {
    id: "keynote",
    title: "Keynote Speakers",
    roleDescription: "World-renowned pioneers presenting vision addresses on quantum supremacy and national quantum roadmap.",
    criteria: "Distinguished scientists, fellows of national scientific academies (INSA, IEEE, APS), and senior leaders.",
    expectedScope: "Foundational breakthroughs in fault-tolerant quantum computing and scalable qubit systems.",
    icon: Mic,
    borderGlow: "border-cyan-500/30 hover:border-cyan-400",
    iconColor: "text-cyan-400",
  },
  {
    id: "plenary",
    title: "Plenary Speakers",
    roleDescription: "Distinguished senior researchers detailing comprehensive breakthroughs across core quantum themes.",
    criteria: "Professors from premier national/international institutions (IITs, IISc, TIFR, IBM Quantum, etc.).",
    expectedScope: "Deep-dives into quantum error correction, algorithmic lower bounds, and quantum machine learning.",
    icon: Layers,
    borderGlow: "border-purple-500/30 hover:border-purple-400",
    iconColor: "text-purple-400",
  },
  {
    id: "invited",
    title: "Invited Speakers",
    roleDescription: "Leading academics and technical specialists delivering specialized masterclasses and tutorial sessions.",
    criteria: "Active research group leaders and quantum software stack architects.",
    expectedScope: "Hands-on implementation of quantum simulators, circuit optimization, and quantum transpilation.",
    icon: GraduationCap,
    borderGlow: "border-blue-500/30 hover:border-blue-400",
    iconColor: "text-blue-400",
  },
  {
    id: "chief-guest",
    title: "Chief Guest",
    roleDescription: "Eminent dignitary from government and national scientific bodies presiding over the inaugural ceremony.",
    criteria: "Leadership from DST, National Quantum Mission, or MeitY scientific advisory council.",
    expectedScope: "Inaugural address and national policy directions for India's quantum ecosystem.",
    icon: Star,
    borderGlow: "border-amber-500/30 hover:border-amber-400",
    iconColor: "text-amber-400",
  },
  {
    id: "panelists",
    title: "Panelists",
    roleDescription: "Cross-disciplinary leaders debating the commercialization timeline and quantum-ready workforce.",
    criteria: "Industry executives, deep-tech venture partners, and leading quantum startup founders.",
    expectedScope: "Industry-academia roadmaps, quantum workforce development, and commercial use-cases.",
    icon: Users,
    borderGlow: "border-cyan-500/30 hover:border-cyan-400",
    iconColor: "text-cyan-400",
  },
];

export default function SpeakersSection() {
  const [selectedCategory, setSelectedCategory] = useState<SpeakerCategoryDetail | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const [nomineeName, setNomineeName] = useState("");
  const [nomineeOrg, setNomineeOrg] = useState("");
  const [nominationSent, setNominationSent] = useState(false);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes("@")) return;
    setNotified(true);
    setTimeout(() => {
      setNotifyEmail("");
    }, 4000);
  };

  const handleNominationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomineeName.trim()) return;
    setNominationSent(true);
    setTimeout(() => {
      setNominationSent(false);
      setSelectedCategory(null);
      setNomineeName("");
      setNomineeOrg("");
    }, 2500);
  };

  return (
    <section id="speakers" className="relative py-24 overflow-hidden border-t border-slate-800/40">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/6 w-[450px] h-[450px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title Area with Top-Left Sphere & Top-Right |Ψ⟩ Chip from Slide 3 */}
        <div className="relative flex items-center justify-between mb-16">
          {/* Top-Left: Rotating Quantum Sphere */}
          <div className="hidden lg:block absolute -left-6 -top-10 opacity-85 hover:opacity-100 transition-opacity">
            <MiniQuantumSphere size={140} />
          </div>

          {/* Central Section Header */}
          <div className="flex flex-col items-center text-center mx-auto max-w-2xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              <span>Speakers &amp; Guests</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Speakers &amp;{" "}
              <span className="font-serif italic bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Guests
              </span>
            </h2>

            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Eminent experts and thought leaders from academia, research and industry will share insights into the advances and future of quantum computing.
            </p>
          </div>

          {/* Top-Right: Isometric Glowing |Ψ⟩ Chip */}
          <div className="hidden lg:block absolute -right-6 -top-12 opacity-85 hover:opacity-100 transition-opacity">
            <PsiProcessorChip size={150} />
          </div>
        </div>

        {/* 5 Category Cards (Slide 3 layout) with Dynamic Micro-Interactions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {SPEAKER_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat)}
                className={`glass-panel glass-panel-hover rounded-2xl p-6 flex flex-col items-center text-center justify-between border ${cat.borderGlow} transition-all duration-300 group cursor-pointer hover:-translate-y-2 hover:shadow-[0_12px_35px_-5px_rgba(56,189,248,0.3)] relative overflow-hidden`}
              >
                {/* Subtle card glow on hover */}
                <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-400/10 rounded-full blur-xl group-hover:bg-cyan-400/20 transition-all pointer-events-none" />

                <div className="flex flex-col items-center w-full">
                  {/* Dynamic Icon with Ripple/Pulse */}
                  <div className="relative w-16 h-16 rounded-2xl bg-slate-900/80 border border-slate-700/60 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:border-cyan-400/50 transition-all shadow-inner">
                    <Icon className={`w-8 h-8 ${cat.iconColor} transition-transform group-hover:rotate-6`} />

                    {/* Orbiting ring spark on hover */}
                    <div className="absolute inset-0 rounded-2xl border border-cyan-400/0 group-hover:border-cyan-400/40 group-hover:animate-ping pointer-events-none" />
                  </div>

                  {/* Category Title */}
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                    {cat.title}
                  </h3>

                  {/* Role Description */}
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {cat.roleDescription}
                  </p>
                </div>

                {/* To Be Announced Pill Button (matching Slide 3 exactly) */}
                <div className="w-full pt-2">
                  <div className="w-full py-2.5 px-3 rounded-full bg-gradient-to-r from-cyan-950/60 to-purple-950/60 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-medium tracking-wide flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(56,189,248,0.15)] group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-all">
                    <Clock className="w-3.5 h-3.5 text-cyan-400" />
                    <span>To Be Announced</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Notification Subscription Card */}
        <div className="mt-12 max-w-2xl mx-auto glass-panel rounded-2xl p-6 border border-purple-500/25 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-950/70 border border-purple-400/40 flex items-center justify-center text-purple-300 flex-shrink-0">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">
                Get Notified When Speakers Are Announced
              </h4>
              <p className="text-xs text-slate-400">
                Official guest confirmations will be announced shortly.
              </p>
            </div>
          </div>

          {notified ? (
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono py-2 px-3 rounded-full bg-cyan-950/60 border border-cyan-500/40">
              <CheckCircle2 className="w-4 h-4" />
              <span>Notification preference saved!</span>
            </div>
          ) : (
            <form onSubmit={handleNotifySubmit} className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter email address"
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                required
                className="glass-input text-xs px-3.5 py-2 rounded-full w-full sm:w-48 placeholder:text-slate-500"
              />
              <button
                type="submit"
                className="quantum-btn-gradient text-white text-xs font-semibold px-4 py-2 rounded-full whitespace-nowrap"
              >
                Notify Me
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Speaker Category Details & Nomination Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="glass-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-cyan-400/50 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3.5 mb-5">
              <div className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-cyan-400">
                <selectedCategory.icon className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Speaker Track Category
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedCategory.title}
                </h3>
              </div>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 mb-6">
              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-white block mb-1">Role Description:</strong>
                <p className="text-slate-300 leading-relaxed">{selectedCategory.roleDescription}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-cyan-300 block mb-1">Target Research Scope:</strong>
                <p className="text-slate-300 leading-relaxed">{selectedCategory.expectedScope}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                <strong className="text-purple-300 block mb-1">Profile Criteria:</strong>
                <p className="text-slate-300 leading-relaxed">{selectedCategory.criteria}</p>
              </div>
            </div>

            {/* Nomination / Speaker Recommendation Form */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-950/30 to-purple-950/30 border border-cyan-500/25">
              <h4 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-cyan-400" />
                <span>Suggest a Speaker for this Category</span>
              </h4>

              {nominationSent ? (
                <div className="text-emerald-300 text-xs flex items-center gap-2 py-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Recommendation forwarded to Organising Committee!</span>
                </div>
              ) : (
                <form onSubmit={handleNominationSubmit} className="space-y-2.5">
                  <input
                    type="text"
                    placeholder="Speaker full name"
                    value={nomineeName}
                    onChange={(e) => setNomineeName(e.target.value)}
                    required
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                  />
                  <input
                    type="text"
                    placeholder="Institution / Affiliation"
                    value={nomineeOrg}
                    onChange={(e) => setNomineeOrg(e.target.value)}
                    className="glass-input w-full px-3 py-2 rounded-xl text-xs"
                  />
                  <button
                    type="submit"
                    className="quantum-btn-gradient text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 w-full justify-center"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Recommendation</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
