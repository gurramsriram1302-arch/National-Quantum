import fs from "fs";
import path from "path";
import { Registration, RegistrationInput, AdminStats, ParticipantCategory, RegistrationStatus, Announcement } from "./types";

const DATA_DIR = path.join(process.cwd(), "data");
const REGISTRATIONS_FILE = path.join(DATA_DIR, "registrations.json");
const ANNOUNCEMENTS_FILE = path.join(DATA_DIR, "announcements.json");

// Ensure data folder and files exist
function ensureDataFiles() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(REGISTRATIONS_FILE)) {
    // Seed with realistic demo sample data to showcase the dashboard immediately
    const sampleRegistrations: Registration[] = [
      {
        id: "reg-demo-1",
        registrationId: "NSQC-2026-1082",
        fullName: "Dr. Arvind Radhakrishnan",
        email: "arvind.r@iitb.ac.in",
        mobileNumber: "+91 98451 22341",
        institution: "IIT Bombay",
        department: "Department of Physics & Quantum Computing Lab",
        designation: "Associate Professor",
        category: "Faculty Members",
        cityState: "Mumbai, Maharashtra",
        areasOfInterest: "Quantum Error Correction, Surface Codes, Neutral Atom Qubits",
        status: "Confirmed",
        createdAt: "2026-11-10T10:15:00Z"
      },
      {
        id: "reg-demo-2",
        registrationId: "NSQC-2026-1490",
        fullName: "Sanyukta Sharma",
        email: "sanyukta.sharma@research.tifr.res.in",
        mobileNumber: "+91 97120 54321",
        institution: "Tata Institute of Fundamental Research (TIFR)",
        department: "School of Technology and Computer Science",
        designation: "Research Scholar",
        category: "Research Scholars",
        cityState: "Mumbai, Maharashtra",
        areasOfInterest: "Quantum Algorithms, Variational Quantum Eigensolvers (VQE)",
        status: "Confirmed",
        createdAt: "2026-11-11T14:30:00Z"
      },
      {
        id: "reg-demo-3",
        registrationId: "NSQC-2026-2104",
        fullName: "Karthik Raja M",
        email: "karthik.raja@vignan.ac.in",
        mobileNumber: "+91 94432 87654",
        institution: "Vignan's Foundation for Science, Technology & Research",
        department: "Computer Science & Engineering",
        designation: "Student (B.Tech)",
        category: "Students",
        cityState: "Guntur, Andhra Pradesh",
        areasOfInterest: "Quantum Machine Learning, Qiskit, Quantum Circuits",
        status: "Confirmed",
        createdAt: "2026-11-12T09:40:00Z"
      },
      {
        id: "reg-demo-4",
        registrationId: "NSQC-2026-2850",
        fullName: "Vikramaditya Sengupta",
        email: "vikram.sengupta@ibm.quantum.com",
        mobileNumber: "+91 99801 34567",
        institution: "IBM Quantum Systems",
        department: "Quantum System Architecture",
        designation: "Senior Quantum Systems Engineer",
        category: "Industry Professionals",
        cityState: "Bengaluru, Karnataka",
        areasOfInterest: "Superconducting Qubits, Cryogenic Control, Transmons",
        status: "Confirmed",
        createdAt: "2026-11-13T16:20:00Z"
      },
      {
        id: "reg-demo-5",
        registrationId: "NSQC-2026-3391",
        fullName: "Pooja Hegde",
        email: "pooja.hegde@iisc.ac.in",
        mobileNumber: "+91 98234 11223",
        institution: "Indian Institute of Science (IISc)",
        department: "Centre for Quantum Information",
        designation: "PhD Candidate",
        category: "Research Scholars",
        cityState: "Bengaluru, Karnataka",
        areasOfInterest: "Quantum Key Distribution (QKD), Entanglement Routing",
        status: "Confirmed",
        createdAt: "2026-11-14T11:05:00Z"
      }
    ];
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(sampleRegistrations, null, 2), "utf-8");
  }

  if (!fs.existsSync(ANNOUNCEMENTS_FILE)) {
    const defaultAnnouncements: Announcement[] = [
      {
        id: "ann-1",
        title: "Important Update",
        message: "The symposium dates have been updated to 28–29 December 2026. Registration is open with free participant entry.",
        type: "info",
        isActive: true,
        createdAt: "2026-11-15T00:00:00Z"
      }
    ];
    fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(defaultAnnouncements, null, 2), "utf-8");
  }
}

// Read registrations
export function getRegistrations(): Registration[] {
  ensureDataFiles();
  try {
    const data = fs.readFileSync(REGISTRATIONS_FILE, "utf-8");
    return JSON.parse(data) as Registration[];
  } catch (error) {
    console.error("Error reading registrations:", error);
    return [];
  }
}

// Find registration by email (case-insensitive)
export function getRegistrationByEmail(email: string): Registration | undefined {
  const registrations = getRegistrations();
  const normalized = email.trim().toLowerCase();
  return registrations.find((r) => r.email.trim().toLowerCase() === normalized);
}

// Find registration by registrationId (case-insensitive)
export function getRegistrationById(regId: string): Registration | undefined {
  const registrations = getRegistrations();
  const normalized = regId.trim().toUpperCase();
  return registrations.find((r) => r.registrationId.trim().toUpperCase() === normalized || r.id === regId);
}

// Generate unique sequential or randomized registration ID: NSQC-2026-XXXX
export function generateRegistrationId(): string {
  const registrations = getRegistrations();
  const existingIds = new Set(registrations.map((r) => r.registrationId));

  let attempts = 0;
  while (attempts < 100) {
    // 4-digit code between 1000 and 9999
    const code = Math.floor(1000 + Math.random() * 9000);
    const candidate = `NSQC-2026-${code}`;
    if (!existingIds.has(candidate)) {
      return candidate;
    }
    attempts++;
  }
  return `NSQC-2026-${Date.now().toString().slice(-4)}`;
}

// Create new registration
export function createRegistration(input: RegistrationInput): { success: boolean; registration?: Registration; error?: string } {
  ensureDataFiles();
  const registrations = getRegistrations();

  // Check duplicate email
  const existing = getRegistrationByEmail(input.email);
  if (existing) {
    return {
      success: false,
      error: `An entry with email "${input.email}" is already registered with ID: ${existing.registrationId}. Please contact the organising team if you need to update your details.`
    };
  }

  const registrationId = generateRegistrationId();
  const newReg: Registration = {
    id: `reg-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    registrationId,
    fullName: input.fullName.trim(),
    email: input.email.trim().toLowerCase(),
    mobileNumber: input.mobileNumber.trim(),
    institution: input.institution.trim(),
    department: input.department.trim(),
    designation: input.designation.trim(),
    category: input.category,
    cityState: input.cityState.trim(),
    areasOfInterest: input.areasOfInterest?.trim() || "",
    status: "Confirmed",
    createdAt: new Date().toISOString()
  };

  registrations.unshift(newReg);
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2), "utf-8");

  return { success: true, registration: newReg };
}

// Update registration status
export function updateRegistrationStatus(idOrRegId: string, status: RegistrationStatus): boolean {
  ensureDataFiles();
  const registrations = getRegistrations();
  const index = registrations.findIndex(
    (r) => r.id === idOrRegId || r.registrationId.toUpperCase() === idOrRegId.toUpperCase()
  );

  if (index === -1) return false;

  registrations[index].status = status;
  registrations[index].updatedAt = new Date().toISOString();
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2), "utf-8");
  return true;
}

// Delete registration (for admin cleanup)
export function deleteRegistration(idOrRegId: string): boolean {
  ensureDataFiles();
  const registrations = getRegistrations();
  const filtered = registrations.filter(
    (r) => r.id !== idOrRegId && r.registrationId.toUpperCase() !== idOrRegId.toUpperCase()
  );

  if (filtered.length === registrations.length) return false;

  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(filtered, null, 2), "utf-8");
  return true;
}

// Compute Admin Stats
export function getAdminStats(): AdminStats {
  const registrations = getRegistrations();

  const byCategory: Record<ParticipantCategory, number> = {
    "Students": 0,
    "Research Scholars": 0,
    "Faculty Members": 0,
    "Industry Professionals": 0,
    "Other Participants": 0
  };

  const byStatus: Record<RegistrationStatus, number> = {
    "Confirmed": 0,
    "Pending": 0,
    "Waitlisted": 0,
    "Cancelled": 0
  };

  const institutionCounts: Record<string, number> = {};

  for (const r of registrations) {
    if (byCategory[r.category] !== undefined) {
      byCategory[r.category]++;
    } else {
      byCategory["Other Participants"]++;
    }

    if (byStatus[r.status] !== undefined) {
      byStatus[r.status]++;
    } else {
      byStatus["Confirmed"]++;
    }

    const inst = r.institution.trim();
    if (inst) {
      institutionCounts[inst] = (institutionCounts[inst] || 0) + 1;
    }
  }

  const topInstitutions = Object.entries(institutionCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return {
    totalRegistrations: registrations.length,
    byCategory,
    byStatus,
    topInstitutions,
    recentRegistrations: registrations.slice(0, 10)
  };
}

// Announcements
export function getAnnouncements(): Announcement[] {
  ensureDataFiles();
  try {
    const data = fs.readFileSync(ANNOUNCEMENTS_FILE, "utf-8");
    return JSON.parse(data) as Announcement[];
  } catch (error) {
    console.error("Error reading announcements:", error);
    return [];
  }
}

export function saveAnnouncement(announcement: Omit<Announcement, "id" | "createdAt">): Announcement {
  ensureDataFiles();
  const announcements = getAnnouncements();
  const newAnn: Announcement = {
    ...announcement,
    id: `ann-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  announcements.unshift(newAnn);
  fs.writeFileSync(ANNOUNCEMENTS_FILE, JSON.stringify(announcements, null, 2), "utf-8");
  return newAnn;
}
