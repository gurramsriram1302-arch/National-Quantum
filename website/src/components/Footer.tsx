"use client";

import React from "react";
import VignanLogo from "./VignanLogo";
import { Calendar, MapPin, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#040813] border-t border-slate-800/80 pt-16 pb-12 overflow-hidden text-xs text-slate-400">
      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-48 bg-gradient-to-t from-cyan-900/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Col 1: University & Event Branding */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <VignanLogo showSubtitle={false} />
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm mt-2">
              National Symposium on Quantum Computing, Applications and Algorithms (NSQC 2026). A premiere academic and technical gathering hosted by Vignan&apos;s Foundation for Science, Technology &amp; Research.
            </p>

            <div className="flex flex-col gap-2 pt-2 text-slate-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400" />
                <span className="font-semibold text-white">28–29 December 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-purple-400" />
                <span>Vadlamudi, Guntur – 522 213, Andhra Pradesh, India</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Symposium Links
            </h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#hero" className="hover:text-cyan-300 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-cyan-300 transition-colors">
                  About the Symposium
                </a>
              </li>
              <li>
                <a href="#tracks" className="hover:text-cyan-300 transition-colors">
                  Technical Tracks
                </a>
              </li>
              <li>
                <a href="#speakers" className="hover:text-cyan-300 transition-colors">
                  Speakers &amp; Guests
                </a>
              </li>
              <li>
                <a href="#schedule" className="hover:text-cyan-300 transition-colors">
                  Programme Schedule
                </a>
              </li>
              <li>
                <a href="#registration" className="hover:text-cyan-300 transition-colors">
                  Delegate Registration
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-cyan-300 transition-colors">
                  Contact &amp; FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Technical Tracks */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Thematic Tracks
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs">
              <li>• Quantum Algorithms &amp; Complexity</li>
              <li>• Quantum Hardware, QEC &amp; Software</li>
              <li>• Quantum Applications &amp; Industry</li>
              <li>• Quantum Machine Learning (QML)</li>
              <li>• Quantum Communication &amp; Cryptography</li>
            </ul>

            <div className="mt-6 pt-4 border-t border-slate-800/80">
              <Link
                href="/admin"
                className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors p-2 rounded-lg bg-slate-900/60 border border-slate-800"
              >
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>Organiser Portal Login</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            &copy; 2026 Vignan&apos;s Foundation for Science, Technology &amp; Research. All rights reserved.
          </p>

          <p className="text-[11px] text-slate-500 text-center sm:text-right">
            Designed for National Quantum Mission Excellence • Updated Dates: 28–29 December 2026
          </p>
        </div>
      </div>
    </footer>
  );
}
