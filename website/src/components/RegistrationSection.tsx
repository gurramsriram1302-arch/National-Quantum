"use client";

import React, { useState } from "react";
import {
  UserPlus,
  Calendar,
  MapPin,
  Ticket,
  Send,
  User,
  Mail,
  Phone,
  Building,
  Layers,
  Briefcase,
  Users,
  Compass,
  Crosshair,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { ParticipantCategory, Registration } from "@/lib/types";
import RegistrationSuccessModal from "./RegistrationSuccessModal";

const PARTICIPANT_CATEGORIES: ParticipantCategory[] = [
  "Students",
  "Research Scholars",
  "Faculty Members",
  "Industry Professionals",
  "Other Participants",
];

const DESIGNATIONS = [
  "Student (UG / B.Tech / B.Sc)",
  "Student (PG / M.Tech / M.Sc)",
  "Research Scholar / PhD Candidate",
  "Postdoctoral Fellow",
  "Assistant Professor",
  "Associate Professor",
  "Professor / Head of Department",
  "Scientist / R&D Researcher",
  "Quantum Hardware Engineer",
  "Software Engineer / Quantum Developer",
  "Industry Executive / Manager",
  "Other",
];

export default function RegistrationSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobileNumber: "",
    institution: "",
    department: "",
    designation: "",
    category: "" as ParticipantCategory | "",
    cityState: "",
    areasOfInterest: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [registeredItem, setRegisteredItem] = useState<Registration | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    // Client-side validations
    if (!formData.fullName.trim()) {
      setErrorMsg("Please enter your full name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    if (!formData.mobileNumber.trim() || formData.mobileNumber.trim().length < 7) {
      setErrorMsg("Please enter a valid mobile number.");
      return;
    }
    if (!formData.institution.trim()) {
      setErrorMsg("Please enter your institution or organisation.");
      return;
    }
    if (!formData.department.trim()) {
      setErrorMsg("Please specify your department.");
      return;
    }
    if (!formData.designation) {
      setErrorMsg("Please select your designation.");
      return;
    }
    if (!formData.category) {
      setErrorMsg("Please select your participant category.");
      return;
    }
    if (!formData.cityState.trim()) {
      setErrorMsg("Please enter your city and state.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Registration failed. Please try again.");
      }

      setRegisteredItem(data.registration);
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        mobileNumber: "",
        institution: "",
        department: "",
        designation: "",
        category: "",
        cityState: "",
        areasOfInterest: "",
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="registration" className="relative py-24 overflow-hidden border-t border-slate-800/40">
      {/* Background ambient light */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-700/10 rounded-full blur-[170px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Registration Details (Slide 4 Left Layout) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 text-xs font-mono uppercase tracking-widest shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <span>Symposium 2026</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Registration
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              Be a part of the{" "}
              <strong className="text-white">
                National Symposium on Quantum Computing, Applications and Algorithms
              </strong>.
            </p>

            {/* Event Dates and Venue Badges */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-slate-200">
                <Calendar className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                <span className="text-sm font-semibold tracking-wide">
                  28–29 December 2026
                </span>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-slate-300">
                <MapPin className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span className="text-xs sm:text-sm leading-snug">
                  Vignan&apos;s Foundation for Science, Technology &amp; Research, Vadlamudi, Guntur, Andhra Pradesh
                </span>
              </div>
            </div>

            {/* Registration Fee Highlight Card (Slide 4 Left) */}
            <div className="rounded-2xl p-6 bg-gradient-to-r from-purple-950/50 via-slate-900/60 to-cyan-950/50 border border-purple-500/30 shadow-[0_0_25px_rgba(139,92,246,0.2)]">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 rounded-lg bg-purple-900/60 text-purple-300">
                  <Ticket className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-semibold">
                  Registration Fee
                </span>
              </div>
              <h3 className="text-2xl font-black text-white">
                To Be Announced
              </h3>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Registration is currently expected to be <strong className="text-cyan-300">FREE</strong> of charge for verified delegates, subject to university confirmation. No payment is required at this stage.
              </p>
            </div>

            {/* Paper & Abstract Submission Notice */}
            <div className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-400 leading-relaxed">
              <strong className="text-slate-200 block mb-1">
                Paper &amp; Abstract Submissions:
              </strong>
              Paper and abstract submission arrangements are pending confirmation. Submission portal guidelines and deadlines will be announced shortly.
            </div>
          </div>

          {/* Right Column: Participant Registration Form (Slide 4 Right Layout) */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-9 border border-cyan-500/30 shadow-[0_0_40px_rgba(56,189,248,0.15)] relative overflow-hidden">
              {/* Form Title & Top Wave Graphic */}
              <div className="flex items-center justify-between pb-6 mb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-cyan-950/70 border border-cyan-400/40 text-cyan-400">
                    <UserPlus className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white tracking-wide">
                      Participant Registration
                    </h3>
                    <p className="text-xs text-slate-400">
                      All fields marked with <span className="text-cyan-400">*</span> are mandatory
                    </p>
                  </div>
                </div>

                {/* Decorative neon quantum wave */}
                <div className="hidden sm:block">
                  <svg width="100" height="24" viewBox="0 0 100 24" fill="none">
                    <path
                      d="M0 12C20 0 30 24 50 12C70 0 80 24 100 12"
                      stroke="url(#neon-wave)"
                      strokeWidth="2.5"
                    />
                    <defs>
                      <linearGradient id="neon-wave" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                        <stop stopColor="#38bdf8" />
                        <stop offset="1" stopColor="#c084fc" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              </div>

              {/* Error Message Box */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-start gap-3">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form Element */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email Address <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter your email address"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Mobile Number */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Mobile Number <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        name="mobileNumber"
                        placeholder="Enter your mobile number"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Institution / Organisation */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Institution / Organisation <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Building className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="institution"
                        placeholder="Enter your institution / organisation"
                        value={formData.institution}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Department */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Department <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Layers className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="department"
                        placeholder="Enter your department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
                      />
                    </div>
                  </div>

                  {/* Designation Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Designation <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Briefcase className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm appearance-none bg-[#09152e] cursor-pointer"
                      >
                        <option value="" disabled>Select designation</option>
                        {DESIGNATIONS.map((d) => (
                          <option key={d} value={d} className="bg-[#0b1736] text-white">
                            {d}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Participant Category Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Participant Category <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Users className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm appearance-none bg-[#09152e] cursor-pointer"
                      >
                        <option value="" disabled>Select category</option>
                        {PARTICIPANT_CATEGORIES.map((c) => (
                          <option key={c} value={c} className="bg-[#0b1736] text-white">
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* City & State */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      City &amp; State <span className="text-cyan-400">*</span>
                    </label>
                    <div className="relative">
                      <Compass className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        name="cityState"
                        placeholder="Enter city and state"
                        value={formData.cityState}
                        onChange={handleChange}
                        required
                        className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Areas of Interest (optional) */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Areas of Interest <span className="text-slate-500 font-normal">(optional)</span>
                  </label>
                  <div className="relative">
                    <Crosshair className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                    <textarea
                      name="areasOfInterest"
                      rows={2}
                      placeholder="e.g., quantum algorithms, quantum hardware, QML, QEC, etc."
                      value={formData.areasOfInterest}
                      onChange={handleChange}
                      className="glass-input w-full pl-10 pr-3.5 py-2.5 rounded-xl text-xs sm:text-sm placeholder:text-slate-500 resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full quantum-btn-gradient text-white text-sm sm:text-base font-bold py-3.5 px-6 rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(124,58,237,0.5)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Processing Registration...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Registration</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {registeredItem && (
        <RegistrationSuccessModal
          registration={registeredItem}
          onClose={() => setRegisteredItem(null)}
        />
      )}
    </section>
  );
}
