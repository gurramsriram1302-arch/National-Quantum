"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X } from "lucide-react";
import { Announcement } from "@/lib/types";

export default function AnnouncementBanner() {
  const [announcement, setAnnouncement] = useState<Announcement | null>({
    id: "ann-default",
    title: "Official Update",
    message: "Symposium dates confirmed for 28–29 December 2026. Online registration is now open with free delegate entry.",
    type: "info",
    isActive: true,
    createdAt: "2026-11-15T00:00:00Z",
  });
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    async function loadAnnouncements() {
      try {
        const res = await fetch("/api/admin/announcements");
        if (res.ok) {
          const data = await res.json();
          const active = data.announcements?.find((a: Announcement) => a.isActive);
          if (active) setAnnouncement(active);
        }
      } catch {
        // fallback
      }
    }
    loadAnnouncements();
  }, []);

  if (dismissed || !announcement || !announcement.isActive) return null;

  return (
    <div className="relative z-50 bg-gradient-to-r from-purple-950/90 via-[#0a1733] to-cyan-950/90 border-b border-cyan-500/25 py-2 px-4 text-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5 mx-auto text-center">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 font-mono text-[10px] uppercase font-bold tracking-wider">
            <Sparkles className="w-3 h-3 text-cyan-400" />
            {announcement.title}
          </span>
          <span className="text-slate-200 font-medium">
            {announcement.message}
          </span>
        </div>

        <button
          onClick={() => setDismissed(true)}
          className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors flex-shrink-0"
          title="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
