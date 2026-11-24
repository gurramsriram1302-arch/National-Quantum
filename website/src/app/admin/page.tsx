"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Lock,
  LogOut,
  Users,
  Search,
  Filter,
  Download,
  CheckCircle2,
  Clock,
  AlertCircle,
  Eye,
  Trash2,
  RefreshCw,
  Plus,
  ArrowLeft,
  GraduationCap,
  Briefcase,
  Building,
  Calendar,
  Sparkles,
  Megaphone,
} from "lucide-react";
import { Registration, AdminStats, ParticipantCategory, RegistrationStatus } from "@/lib/types";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);

  // Dashboard state
  const [activeTab, setActiveTab] = useState<"registrations" | "announcements" | "settings">("registrations");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loadingData, setLoadingData] = useState(false);
  const [selectedReg, setSelectedReg] = useState<Registration | null>(null);

  // Announcement state
  const [annTitle, setAnnTitle] = useState("");
  const [annMessage, setAnnMessage] = useState("");
  const [annSuccess, setAnnSuccess] = useState(false);

  // Initial auth check
  useEffect(() => {
    fetchRegistrations();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      setIsAuthenticated(true);
      fetchRegistrations();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setLoginError(err.message);
      } else {
        setLoginError("Failed to authenticate.");
      }
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    setIsAuthenticated(false);
    setPassword("");
  };

  const fetchRegistrations = async () => {
    setLoadingData(true);
    try {
      const query = new URLSearchParams();
      if (search) query.set("search", search);
      if (categoryFilter !== "All") query.set("category", categoryFilter);
      if (statusFilter !== "All") query.set("status", statusFilter);

      const res = await fetch(`/api/admin/registrations?${query.toString()}`);
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations || []);
        setStats(data.stats || null);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error("Error loading admin data:", err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: RegistrationStatus) => {
    try {
      const res = await fetch("/api/admin/registrations", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        fetchRegistrations();
        if (selectedReg && selectedReg.id === id) {
          setSelectedReg({ ...selectedReg, status: newStatus });
        }
      }
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const handleDeleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to remove this registration record?")) return;
    try {
      const res = await fetch(`/api/admin/registrations?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        fetchRegistrations();
        if (selectedReg?.id === id) setSelectedReg(null);
      }
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCreateAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!annTitle.trim() || !annMessage.trim()) return;

    try {
      const res = await fetch("/api/admin/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: annTitle,
          message: annMessage,
          type: "info",
          isActive: true,
        }),
      });
      if (res.ok) {
        setAnnSuccess(true);
        setAnnTitle("");
        setAnnMessage("");
        setTimeout(() => setAnnSuccess(false), 4000);
      }
    } catch (err) {
      console.error("Announcement error:", err);
    }
  };

  // 1. Login View
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#060c1b] flex items-center justify-center p-4 relative overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-cyan-500/30 shadow-[0_0_50px_rgba(56,189,248,0.2)] relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 mb-6 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Public Website</span>
          </Link>

          <div className="flex flex-col items-center text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-cyan-950/70 border border-cyan-400/50 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.3)] mb-3">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-wide">
              Organiser Admin Portal
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              National Symposium on Quantum Computing 2026
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Admin Access Key
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  placeholder="Enter administrator password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="glass-input w-full pl-10 pr-3.5 py-3 rounded-xl text-sm placeholder:text-slate-500"
                />
              </div>
              <p className="text-[11px] text-slate-500 font-mono mt-1.5">
                Default Access Key: <code className="text-cyan-300 font-bold">quantum2026admin</code>
              </p>
            </div>

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full quantum-btn-gradient text-white text-sm font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
            >
              {loginLoading ? (
                <span>Authenticating...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Access Dashboard</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dashboard View
  return (
    <div className="min-h-screen bg-[#060c1b] text-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-[#09152e]/90 backdrop-blur-md border-b border-cyan-500/20 px-6 py-4 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>View Website</span>
            </Link>
            <div className="h-4 w-[1px] bg-slate-700" />
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-cyan-400" />
              <h1 className="text-sm sm:text-base font-bold text-white tracking-wide">
                NSQC 2026 Organiser Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-full hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Authorized Session
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-red-400 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700/60 transition-colors border border-slate-700"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-grow">
        {/* Stats Metrics Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
          {/* Total Registrations */}
          <div className="glass-panel rounded-2xl p-4 border border-cyan-500/30">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Total</span>
              <Users className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats?.totalRegistrations ?? registrations.length}
            </div>
            <span className="text-[11px] text-cyan-300 mt-1 block">
              Registered Delegates
            </span>
          </div>

          {/* Students */}
          <div className="glass-panel rounded-2xl p-4 border border-blue-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Students</span>
              <GraduationCap className="w-4 h-4 text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats?.byCategory["Students"] ?? 0}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">UG / PG Candidates</span>
          </div>

          {/* Research Scholars */}
          <div className="glass-panel rounded-2xl p-4 border border-purple-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Scholars</span>
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats?.byCategory["Research Scholars"] ?? 0}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">PhD / Postdocs</span>
          </div>

          {/* Faculty Members */}
          <div className="glass-panel rounded-2xl p-4 border border-indigo-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Faculty</span>
              <Building className="w-4 h-4 text-indigo-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats?.byCategory["Faculty Members"] ?? 0}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Professors &amp; Academics</span>
          </div>

          {/* Industry */}
          <div className="glass-panel rounded-2xl p-4 border border-emerald-500/25">
            <div className="flex items-center justify-between text-slate-400 mb-2">
              <span className="text-xs font-mono uppercase tracking-wider">Industry</span>
              <Briefcase className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white">
              {stats?.byCategory["Industry Professionals"] ?? 0}
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Corporate &amp; R&amp;D</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-4 mb-6">
          <button
            onClick={() => setActiveTab("registrations")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "registrations"
                ? "bg-cyan-500 text-black shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Registrations ({registrations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("announcements")}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all ${
              activeTab === "announcements"
                ? "bg-cyan-500 text-black shadow-md font-bold"
                : "text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            <Megaphone className="w-4 h-4" />
            <span>Manage Announcements</span>
          </button>
        </div>

        {/* TAB 1: REGISTRATIONS */}
        {activeTab === "registrations" && (
          <div className="space-y-6">
            {/* Filter and Search Bar */}
            <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
                {/* Search */}
                <div className="relative w-full sm:w-64">
                  <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search name, ID, email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && fetchRegistrations()}
                    className="glass-input w-full pl-9 pr-3 py-2 rounded-xl text-xs"
                  />
                </div>

                {/* Category Filter */}
                <select
                  value={categoryFilter}
                  onChange={(e) => {
                    setCategoryFilter(e.target.value);
                  }}
                  className="glass-input px-3 py-2 rounded-xl text-xs bg-[#0b1736] w-full sm:w-auto"
                >
                  <option value="All">All Categories</option>
                  <option value="Students">Students</option>
                  <option value="Research Scholars">Research Scholars</option>
                  <option value="Faculty Members">Faculty Members</option>
                  <option value="Industry Professionals">Industry Professionals</option>
                  <option value="Other Participants">Other Participants</option>
                </select>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                  }}
                  className="glass-input px-3 py-2 rounded-xl text-xs bg-[#0b1736] w-full sm:w-auto"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending">Pending</option>
                  <option value="Waitlisted">Waitlisted</option>
                </select>

                <button
                  onClick={fetchRegistrations}
                  className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                  title="Refresh list"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* Export to CSV Action */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <a
                  href="/api/admin/export"
                  download
                  className="quantum-btn-gradient text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-2 shadow-md"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export to CSV</span>
                </a>
              </div>
            </div>

            {/* Registrations Table */}
            <div className="glass-panel rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-[#0b1736] text-slate-400 uppercase font-mono text-[10px] tracking-wider border-b border-slate-800">
                    <tr>
                      <th className="py-3.5 px-4">Registration ID</th>
                      <th className="py-3.5 px-4">Participant</th>
                      <th className="py-3.5 px-4">Category &amp; Role</th>
                      <th className="py-3.5 px-4">Institution</th>
                      <th className="py-3.5 px-4">Status</th>
                      <th className="py-3.5 px-4">Registered Date</th>
                      <th className="py-3.5 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 font-sans">
                    {registrations.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="py-12 text-center text-slate-500 font-mono">
                          {loadingData ? "Loading records..." : "No registrations found matching criteria."}
                        </td>
                      </tr>
                    ) : (
                      registrations.map((r) => (
                        <tr
                          key={r.id}
                          className="hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3.5 px-4 font-mono font-bold text-cyan-300">
                            {r.registrationId}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-semibold text-white">{r.fullName}</div>
                            <div className="text-[11px] text-slate-400">{r.email}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="text-white font-medium">{r.category}</span>
                            <div className="text-[11px] text-slate-400">{r.designation}</div>
                          </td>
                          <td className="py-3.5 px-4 max-w-[200px] truncate" title={r.institution}>
                            <div className="truncate text-slate-200">{r.institution}</div>
                            <div className="text-[11px] text-slate-400 truncate">{r.cityState}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span
                              className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold inline-flex items-center gap-1 ${
                                r.status === "Confirmed"
                                  ? "bg-emerald-950/60 text-emerald-400 border border-emerald-500/30"
                                  : r.status === "Pending"
                                  ? "bg-amber-950/60 text-amber-400 border border-amber-500/30"
                                  : "bg-blue-950/60 text-blue-400 border border-blue-500/30"
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current" />
                              {r.status}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">
                            {new Date(r.createdAt).toLocaleDateString("en-IN")}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedReg(r)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 transition-colors"
                                title="View Complete Details"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleDeleteRegistration(r.id)}
                                className="p-1.5 rounded-lg bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-300 transition-colors"
                                title="Delete Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANNOUNCEMENTS */}
        {activeTab === "announcements" && (
          <div className="max-w-2xl glass-panel rounded-3xl p-6 sm:p-8 border border-cyan-500/30">
            <h3 className="text-xl font-bold text-white mb-2">
              Broadcast Symposium Announcement
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Create official notices to appear in the top banner of the website.
            </p>

            {annSuccess && (
              <div className="mb-6 p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Announcement updated successfully!</span>
              </div>
            )}

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Announcement Tag / Headline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Important Update, Schedule Notice"
                  value={annTitle}
                  onChange={(e) => setAnnTitle(e.target.value)}
                  required
                  className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Full Announcement Message
                </label>
                <textarea
                  rows={3}
                  placeholder="Enter the broadcast message for website visitors..."
                  value={annMessage}
                  onChange={(e) => setAnnMessage(e.target.value)}
                  required
                  className="glass-input w-full px-3.5 py-2.5 rounded-xl text-sm resize-none"
                />
              </div>

              <button
                type="submit"
                className="quantum-btn-gradient text-white text-xs font-bold py-3 px-6 rounded-xl flex items-center gap-2"
              >
                <Megaphone className="w-4 h-4" />
                <span>Publish Announcement</span>
              </button>
            </form>
          </div>
        )}
      </main>

      {/* Participant Details Inspector Modal */}
      {selectedReg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel max-w-lg w-full rounded-3xl p-6 sm:p-8 border border-cyan-500/40 shadow-2xl relative">
            <div className="flex items-start justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                  Delegate Profile
                </span>
                <h3 className="text-xl font-bold text-white">
                  {selectedReg.fullName}
                </h3>
                <span className="text-xs font-mono text-cyan-300 font-semibold">
                  {selectedReg.registrationId}
                </span>
              </div>

              <button
                onClick={() => setSelectedReg(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800"
              >
                ✕
              </button>
            </div>

            <div className="py-5 space-y-3.5 text-xs text-slate-300">
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Email Address</span>
                  <span className="font-semibold text-white">{selectedReg.email}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Mobile Number</span>
                  <span className="font-semibold text-white">{selectedReg.mobileNumber}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Category</span>
                  <span className="font-semibold text-cyan-300">{selectedReg.category}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-slate-500 block">Designation</span>
                  <span className="font-semibold text-white">{selectedReg.designation}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-slate-500 block">Institution &amp; Department</span>
                <p className="font-medium text-white">{selectedReg.institution}</p>
                <p className="text-slate-400">{selectedReg.department}</p>
                <p className="text-slate-500 text-[11px]">{selectedReg.cityState}</p>
              </div>

              {selectedReg.areasOfInterest && (
                <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-[10px] font-mono uppercase text-slate-500 block mb-1">
                    Areas of Interest
                  </span>
                  <p className="text-slate-200">{selectedReg.areasOfInterest}</p>
                </div>
              )}

              {/* Status Manager */}
              <div className="pt-2 flex items-center justify-between">
                <span className="text-xs text-slate-400">Change Status:</span>
                <div className="flex items-center gap-1.5">
                  {(["Confirmed", "Pending", "Waitlisted"] as RegistrationStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedReg.id, st)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        selectedReg.status === st
                          ? "bg-cyan-500 text-black font-bold"
                          : "bg-slate-800 text-slate-400 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => setSelectedReg(null)}
                className="quantum-btn-gradient text-white text-xs font-semibold px-5 py-2.5 rounded-xl"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
