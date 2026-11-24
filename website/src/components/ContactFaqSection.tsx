"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  Headphones,
  Mail,
  Phone,
  MapPin,
  Users,
  HelpCircle,
  ChevronDown,
  ExternalLink,
} from "lucide-react";

const FAQ_ITEMS = [
  {
    q: "Who can register for the symposium?",
    a: "The symposium is open to undergraduate and postgraduate students, research scholars, faculty members, academicians, scientists, industry professionals, and all individuals enthusiastic about quantum computing, algorithms, hardware, and emerging applications."
  },
  {
    q: "Is there a registration fee?",
    a: "Registration is currently expected to be FREE for all participant categories, subject to university confirmation. No payment gateway or fee collection is active at this stage. Any updates will be officially notified to registered delegates."
  },
  {
    q: "Will there be a paper submission?",
    a: "Paper and abstract submission arrangements are pending confirmation by the technical program committee. Official call-for-papers guidelines, formatting templates, and review timelines will be announced on this website shortly."
  },
  {
    q: "How will I receive my registration confirmation?",
    a: "Upon submitting the registration form, you immediately receive a verified Delegate Registration ID (e.g. NSQC-2026-XXXX) and a digital pass card that you can download or print. If automated email service is enabled, a confirmation email will also be dispatched."
  },
  {
    q: "Will certificates be provided to attendees?",
    a: "Yes. All registered attendees who participate in the technical sessions across both symposium days (28–29 December 2026) will be awarded an official Certificate of Participation issued by Vignan's Foundation for Science, Technology & Research."
  },
  {
    q: "Where is the venue and how do I reach it?",
    a: "The symposium takes place at Vignan's Foundation for Science, Technology & Research campus in Vadlamudi, Guntur district, Andhra Pradesh (PIN: 522 213). The campus is well-connected by road and rail from Guntur Junction (15 km) and Vijayawada Railway Station / Airport (35 km)."
  }
];

export default function ContactFaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="contact" className="relative py-24 overflow-hidden border-t border-slate-800/40">
      {/* Background ambient light */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-cyan-700/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
            <MessageSquare className="w-4 h-4 text-cyan-400" />
            <span>Contact &amp; FAQs</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Contact &amp;{" "}
            <span className="font-serif italic bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              FAQs
            </span>
          </h2>

          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Get in touch with the organising team or find answers to common questions.
          </p>
        </div>

        {/* Two Columns: Left Contact Us, Right FAQs (Slide 4 Bottom Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Us Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/25 shadow-xl flex flex-col justify-between h-full">
            <div>
              {/* Card Title */}
              <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800">
                <div className="p-2.5 rounded-xl bg-cyan-950/70 border border-cyan-400/40 text-cyan-400">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">
                    Contact Us
                  </h3>
                  <p className="text-xs text-slate-400 font-mono">
                    Official Symposium Helpdesk
                  </p>
                </div>
              </div>

              {/* Contact Details List */}
              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Mail className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Email Query Desk
                    </span>
                    <a
                      href="mailto:quantum2026@vignan.ac.in"
                      className="text-sm font-semibold text-white hover:text-cyan-300 transition-colors"
                    >
                      quantum2026@vignan.ac.in
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <Phone className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Telephone Helpline
                    </span>
                    <span className="text-sm font-semibold text-white">
                      +91 - 863 - 2345 678{" "}
                      <span className="text-xs text-slate-400 font-normal">
                        (Ext. to be updated)
                      </span>
                    </span>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-3.5 p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <MapPin className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                      Institution Campus &amp; Venue
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                      Vignan&apos;s Foundation for Science, Technology &amp; Research
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Vadlamudi, Guntur – 522 213, Andhra Pradesh, India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Organising Committee Card (matching Slide 4) */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-purple-950/40 to-blue-950/40 border border-purple-500/25">
              <div className="flex items-center gap-2 mb-2 text-purple-300">
                <Users className="w-4 h-4" />
                <h4 className="text-xs font-bold uppercase tracking-wider">
                  Organising Committee
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                For registration, participation, and other symposium-related queries, please contact the organising team at the above official email.
              </p>
            </div>
          </div>

          {/* Right Column: Frequently Asked Questions Accordion (Slide 4 Right Layout) */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 shadow-xl">
            {/* Header */}
            <div className="flex items-center gap-3 pb-6 mb-6 border-b border-slate-800">
              <div className="p-2.5 rounded-xl bg-purple-950/70 border border-purple-400/40 text-purple-400">
                <HelpCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white tracking-wide">
                  Frequently Asked Questions
                </h3>
                <p className="text-xs text-slate-400 font-mono">
                  Everything you need to know about NSQC 2026
                </p>
              </div>
            </div>

            {/* Accordion List */}
            <div className="space-y-3">
              {FAQ_ITEMS.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                      isOpen
                        ? "bg-slate-900/80 border-cyan-500/40 shadow-[0_0_15px_rgba(56,189,248,0.1)]"
                        : "bg-slate-900/40 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <button
                      onClick={() => toggleAccordion(idx)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm font-semibold text-white tracking-wide">
                        {item.q}
                      </span>
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                          isOpen
                            ? "rotate-180 bg-cyan-500/20 text-cyan-300"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 animate-in fade-in duration-200">
                        {item.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
