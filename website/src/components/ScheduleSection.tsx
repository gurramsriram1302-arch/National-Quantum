"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  Coffee,
  Utensils,
  Presentation,
  Award,
  AlertCircle,
  Download,
  Filter,
  Search,
  MapPin,
  User,
  X,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { ScheduleItem } from "@/lib/types";
import HeroQuantumWave from "./HeroQuantumWave";

const DAY_1_SCHEDULE: ScheduleItem[] = [
  {
    id: "d1-1",
    day: 1,
    date: "28 December 2026",
    time: "09:00 – 10:00",
    title: "Inaugural Session",
    type: "inaugural",
    speaker: "Dignitaries, Vice-Chancellor & Guest of Honour",
    venue: "Main Auditorium, Vignan's Campus",
    notes: "Lighting of the lamp, presidential address, symposium roadmap presentation, and release of symposium proceedings souvenir."
  },
  {
    id: "d1-2",
    day: 1,
    date: "28 December 2026",
    time: "10:00 – 11:00",
    title: "Keynote 1",
    type: "keynote",
    speaker: "To Be Announced (Quantum Computing Frontiers)",
    venue: "Main Auditorium",
    notes: "Foundations of Quantum Speedup, Algorithmic Complexity, and Realizable Quantum Hardware Roadmaps."
  },
  {
    id: "d1-3",
    day: 1,
    date: "28 December 2026",
    time: "11:00 – 11:20",
    title: "Tea Break",
    type: "break",
    isBreak: true,
    highlightColor: "cyan",
    venue: "Symposium Foyer",
    notes: "Morning networking high tea, poster viewing, and delegate interactions."
  },
  {
    id: "d1-4",
    day: 1,
    date: "28 December 2026",
    time: "11:20 – 12:50",
    title: "Plenary 1",
    type: "plenary",
    speaker: "To Be Announced",
    venue: "Main Auditorium",
    notes: "Fault-Tolerant Architectures, Quantum Error Correction Codes, and Physical Qubit Scaling."
  },
  {
    id: "d1-5",
    day: 1,
    date: "28 December 2026",
    time: "12:50 – 13:45",
    title: "Lunch Break",
    type: "break",
    isBreak: true,
    highlightColor: "purple",
    venue: "Banquet Hall",
    notes: "Complimentary scientific networking luncheon for delegates and faculty."
  },
  {
    id: "d1-6",
    day: 1,
    date: "28 December 2026",
    time: "13:45 – 15:15",
    title: "Paper Session PS-1",
    type: "paper-session",
    venue: "Parallel Halls A & B",
    notes: "Contributed research paper presentations: Quantum Algorithms & Hardware Platforms."
  },
  {
    id: "d1-7",
    day: 1,
    date: "28 December 2026",
    time: "15:15 – 15:35",
    title: "Tea Break",
    type: "break",
    isBreak: true,
    highlightColor: "cyan",
    venue: "Symposium Foyer",
    notes: "Afternoon high tea and scientific poster interactions."
  },
  {
    id: "d1-8",
    day: 1,
    date: "28 December 2026",
    time: "15:35 – 16:35",
    title: "Invited Talk Session I",
    type: "invited-talk",
    speaker: "To Be Announced",
    venue: "Hall A",
    notes: "Practical implementation of quantum simulators, circuit synthesis, and compilers."
  },
];

const DAY_2_SCHEDULE: ScheduleItem[] = [
  {
    id: "d2-1",
    day: 2,
    date: "29 December 2026",
    time: "09:00 – 10:00",
    title: "Keynote 2",
    type: "keynote",
    speaker: "To Be Announced",
    venue: "Main Auditorium",
    notes: "Quantum Machine Learning: Variational Quantum Circuits, Synergies, and Algorithmic Bounds."
  },
  {
    id: "d2-2",
    day: 2,
    date: "29 December 2026",
    time: "10:00 – 10:45",
    title: "Plenary 3",
    type: "plenary",
    speaker: "To Be Announced",
    venue: "Main Auditorium",
    notes: "Quantum Communications, Quantum Key Distribution (QKD), and Post-Quantum Cryptography Transitions."
  },
  {
    id: "d2-3",
    day: 2,
    date: "29 December 2026",
    time: "10:45 – 11:05",
    title: "Tea Break",
    type: "break",
    isBreak: true,
    highlightColor: "cyan",
    venue: "Symposium Foyer",
    notes: "Morning tea and informal discussions."
  },
  {
    id: "d2-4",
    day: 2,
    date: "29 December 2026",
    time: "11:05 – 12:35",
    title: "Paper Session PS-2",
    type: "paper-session",
    venue: "Parallel Halls A & B",
    notes: "Contributed paper presentations: Quantum Applications, Chemistry Simulations & QML."
  },
  {
    id: "d2-5",
    day: 2,
    date: "29 December 2026",
    time: "12:35 – 13:20",
    title: "Plenary 4",
    type: "plenary",
    speaker: "To Be Announced",
    venue: "Main Auditorium",
    notes: "Industrial Applications: Quantum Chemistry, Optimization, and Materials Modeling."
  },
  {
    id: "d2-6",
    day: 2,
    date: "29 December 2026",
    time: "13:20 – 14:15",
    title: "Lunch Break",
    type: "break",
    isBreak: true,
    highlightColor: "purple",
    venue: "Banquet Hall",
    notes: "Delegates networking luncheon."
  },
  {
    id: "d2-7",
    day: 2,
    date: "29 December 2026",
    time: "14:15 – 15:45",
    title: "Paper Session PS-3 & Panel Discussion",
    type: "panel",
    venue: "Main Auditorium",
    notes: "Selected oral presentations followed by panel discussion on 'The Quantum Leap: Academia & Industry Roadmap'."
  },
  {
    id: "d2-8",
    day: 2,
    date: "29 December 2026",
    time: "15:45 – 16:15",
    title: "Valedictory Session",
    type: "valedictory",
    venue: "Main Auditorium",
    notes: "Best paper awards, symposium concluding remarks, feedback collection, and distribution of participation certificates."
  },
];

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState<1 | 2>(1);
  const [filterType, setFilterType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSession, setSelectedSession] = useState<ScheduleItem | null>(null);

  const filterItems = (items: ScheduleItem[]) => {
    return items.filter((item) => {
      // Type filter
      if (filterType === "keynote" && !(item.type === "keynote" || item.type === "plenary")) return false;
      if (filterType === "papers" && item.type !== "paper-session") return false;
      if (filterType === "breaks" && !item.isBreak) return false;

      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.title.toLowerCase().includes(q) ||
          item.time.toLowerCase().includes(q) ||
          (item.notes && item.notes.toLowerCase().includes(q)) ||
          (item.speaker && item.speaker.toLowerCase().includes(q))
        );
      }

      return true;
    });
  };

  // Download official .ICS calendar file for delegates
  const handleDownloadCalendar = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Vignan University//National Symposium on Quantum Computing 2026//EN
CALSCALE:GREGORIAN
METHOD:PUBLISH
BEGIN:VEVENT
SUMMARY:National Symposium on Quantum Computing (NSQC 2026) - Day 1
DTSTART:20261228T033000Z
DTEND:20261228T113000Z
DESCRIPTION:National Symposium on Quantum Computing, Applications and Algorithms hosted by Vignan's Foundation for Science, Technology & Research.
LOCATION:Vignan's Foundation for Science, Technology & Research, Vadlamudi, Guntur, AP, India
STATUS:CONFIRMED
END:VEVENT
BEGIN:VEVENT
SUMMARY:National Symposium on Quantum Computing (NSQC 2026) - Day 2
DTSTART:20261229T033000Z
DTEND:20261229T110000Z
DESCRIPTION:National Symposium on Quantum Computing, Applications and Algorithms - Day 2 Technical Sessions & Valedictory.
LOCATION:Vignan's Foundation for Science, Technology & Research, Vadlamudi, Guntur, AP, India
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute("download", "NSQC_2026_Symposium_Schedule.ics");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderScheduleColumn = (items: ScheduleItem[], dayNum: 1 | 2, dateStr: string) => {
    const filtered = filterItems(items);

    return (
      <div className="glass-panel rounded-3xl p-6 sm:p-7 border border-cyan-500/25 flex flex-col h-full shadow-[0_4px_35px_rgba(0,0,0,0.35)] relative overflow-hidden group">
        {/* Holographic corner gradient */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-400/10 rounded-full blur-2xl pointer-events-none" />

        {/* Column Header (Slide 3 layout) */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-950/70 border border-cyan-400/40 text-cyan-400 shadow-[0_0_12px_rgba(56,189,248,0.25)]">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-wide">
                {dateStr}
              </h3>
              <p className="text-xs text-slate-400 font-mono">
                Academic &amp; Technical Schedule
              </p>
            </div>
          </div>

          <div className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-900/70 to-blue-900/70 border border-purple-400/40 text-purple-300 text-xs font-mono font-bold shadow-[0_0_10px_rgba(139,92,246,0.2)]">
            Day {dayNum}
          </div>
        </div>

        {/* Timeline List with Interactive Node Indicators */}
        <div className="relative flex flex-col gap-2.5 pt-5 flex-grow">
          {/* Vertical Connecting Pulse Guide Line */}
          <div className="absolute left-[18px] top-7 bottom-7 w-[2px] bg-slate-800/80 pointer-events-none" />

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-500 font-mono">
              No sessions found matching your filter criteria.
            </div>
          ) : (
            filtered.map((item) => {
              const isCyanBreak = item.highlightColor === "cyan";
              const isPurpleBreak = item.highlightColor === "purple";

              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedSession(item)}
                  className={`flex items-center gap-3.5 p-3 rounded-2xl transition-all duration-200 border cursor-pointer select-none group/row ${
                    isCyanBreak
                      ? "bg-cyan-950/25 border-cyan-500/35 text-cyan-200 hover:bg-cyan-950/45 hover:border-cyan-400/60"
                      : isPurpleBreak
                      ? "bg-purple-950/30 border-purple-500/35 text-purple-200 hover:bg-purple-950/50 hover:border-purple-400/60"
                      : "bg-slate-900/50 border-slate-800/80 hover:bg-slate-850 hover:border-cyan-500/40 text-slate-200"
                  } hover:translate-x-1 hover:shadow-lg`}
                >
                  {/* Timeline Node Indicator */}
                  <div className="relative z-10 flex-shrink-0 w-8 h-8 rounded-full bg-[#081226] border border-slate-700 flex items-center justify-center group-hover/row:border-cyan-400 transition-colors">
                    {isCyanBreak ? (
                      <Coffee className="w-3.5 h-3.5 text-cyan-400" />
                    ) : isPurpleBreak ? (
                      <Utensils className="w-3.5 h-3.5 text-purple-400" />
                    ) : item.type === "valedictory" ? (
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8] group-hover/row:scale-125 transition-transform" />
                    )}
                  </div>

                  {/* Time Badge */}
                  <div className="w-28 flex-shrink-0 font-mono text-xs font-medium text-slate-400 group-hover/row:text-cyan-300 transition-colors">
                    {item.time}
                  </div>

                  {/* Session Title */}
                  <div className="flex-grow flex items-center justify-between gap-2">
                    <span
                      className={`text-sm font-semibold tracking-wide ${
                        isCyanBreak
                          ? "text-cyan-300"
                          : isPurpleBreak
                          ? "text-purple-300"
                          : "text-white group-hover/row:text-cyan-200"
                      }`}
                    >
                      {item.title}
                    </span>

                    <ChevronRight className="w-4 h-4 text-slate-500 group-hover/row:text-cyan-400 group-hover/row:translate-x-0.5 transition-all opacity-0 group-hover/row:opacity-100" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="schedule" className="relative py-24 overflow-hidden border-t border-slate-800/40">
      {/* Background radial glow */}
      <div className="absolute top-1/2 right-10 w-[550px] h-[550px] bg-blue-700/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Undulating Wavy Quantum Ribbon across top of Schedule (from Slide 3) */}
      <div className="absolute top-0 left-0 right-0 opacity-40 pointer-events-none">
        <HeroQuantumWave height={160} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <Calendar className="w-4 h-4 text-cyan-400" />
            <span>Programme Schedule</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Programme{" "}
            <span className="font-serif italic bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Schedule
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            A two-day scientific programme featuring keynote talks, plenary sessions, paper presentations, panel discussions and interactions.
          </p>

          {/* Caution Alert Pill */}
          <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs font-medium">
            <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
            <span>
              Indicative Programme Layout • Final detailed sessions &amp; speakers will be updated upon official committee ratification.
            </span>
          </div>

          {/* Controls Bar: Search, Filters & Add-To-Calendar Action */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 w-full max-w-3xl">
            {/* Search Input */}
            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search session title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="glass-input w-full pl-8 pr-3 py-2 rounded-full text-xs placeholder:text-slate-500"
              />
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center justify-center gap-1.5">
              {[
                { id: "all", label: "All Sessions" },
                { id: "keynote", label: "Keynotes & Plenary" },
                { id: "papers", label: "Paper Sessions" },
                { id: "breaks", label: "Networking & Breaks" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFilterType(f.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all ${
                    filterType === f.id
                      ? "bg-cyan-500 text-black font-semibold shadow-[0_0_15px_rgba(56,189,248,0.4)]"
                      : "glass-pill text-slate-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* 1-Click Calendar Download Button */}
            <button
              onClick={handleDownloadCalendar}
              className="glass-panel hover:bg-slate-800 text-cyan-300 text-xs font-medium px-4 py-1.5 rounded-full border border-cyan-500/30 flex items-center gap-1.5 shadow-sm transition-all"
              title="Add 2-day symposium dates to your calendar"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Add to Calendar (.ICS)</span>
            </button>
          </div>

          {/* Mobile Day Switcher */}
          <div className="lg:hidden mt-6 flex items-center p-1 rounded-full glass-panel border border-slate-700">
            <button
              onClick={() => setActiveDay(1)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeDay === 1
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-slate-400"
              }`}
            >
              Day 1: 28 Dec
            </button>
            <button
              onClick={() => setActiveDay(2)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${
                activeDay === 2
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md"
                  : "text-slate-400"
              }`}
            >
              Day 2: 29 Dec
            </button>
          </div>
        </div>

        {/* Side-by-Side Day Columns (Slide 3 layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Day 1 Column */}
          <div className={`${activeDay === 1 ? "block" : "hidden lg:block"}`}>
            {renderScheduleColumn(DAY_1_SCHEDULE, 1, "28 December 2026")}
          </div>

          {/* Day 2 Column */}
          <div className={`${activeDay === 2 ? "block" : "hidden lg:block"}`}>
            {renderScheduleColumn(DAY_2_SCHEDULE, 2, "29 December 2026")}
          </div>
        </div>
      </div>

      {/* Interactive Session Detail Modal */}
      {selectedSession && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            className="glass-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-cyan-400/50 shadow-2xl relative animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedSession(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Session Type Badge */}
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/40 text-cyan-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                Day {selectedSession.day} • {selectedSession.date}
              </span>
              <span className="px-3 py-1 rounded-full bg-purple-950/60 border border-purple-400/40 text-purple-300 font-mono text-[10px] uppercase font-bold tracking-wider">
                {selectedSession.type.replace("-", " ")}
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-2">
              {selectedSession.title}
            </h3>

            <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 mb-5">
              <Clock className="w-4 h-4" />
              <span>{selectedSession.time}</span>
            </div>

            <div className="space-y-3.5 text-xs text-slate-300 mb-6">
              {selectedSession.venue && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Venue Location</span>
                    <span className="text-white font-medium">{selectedSession.venue}</span>
                  </div>
                </div>
              )}

              {selectedSession.speaker && (
                <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <User className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-mono text-slate-400 block">Session Leader / Speaker</span>
                    <span className="text-white font-medium">{selectedSession.speaker}</span>
                  </div>
                </div>
              )}

              {selectedSession.notes && (
                <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1">Session Synopsis</span>
                  <p className="text-slate-300 leading-relaxed">{selectedSession.notes}</p>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <span className="text-[11px] text-slate-500 font-mono">
                Indicative Schedule • NSQC 2026
              </span>
              <button
                onClick={() => setSelectedSession(null)}
                className="quantum-btn-gradient text-white text-xs font-semibold px-5 py-2.5 rounded-full"
              >
                Close Session Info
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
