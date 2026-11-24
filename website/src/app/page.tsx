import React from "react";
import QuantumParticleCanvas from "@/components/QuantumParticleCanvas";
import AnnouncementBanner from "@/components/AnnouncementBanner";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TracksSection from "@/components/TracksSection";
import SpeakersSection from "@/components/SpeakersSection";
import ScheduleSection from "@/components/ScheduleSection";
import RegistrationSection from "@/components/RegistrationSection";
import ContactFaqSection from "@/components/ContactFaqSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-[#060c1b] text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Interactive 3D Quantum Wave & Particle Mesh */}
      <QuantumParticleCanvas />

      {/* Top Announcement Alert */}
      <AnnouncementBanner />

      {/* Sticky Navigation Bar */}
      <Navbar />

      {/* Main Page Content */}
      <main className="flex-grow z-10">
        <HeroSection />
        <AboutSection />
        <TracksSection />
        <SpeakersSection />
        <ScheduleSection />
        <RegistrationSection />
        <ContactFaqSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
