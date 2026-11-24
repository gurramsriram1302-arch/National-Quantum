export type ParticipantCategory =
  | "Students"
  | "Research Scholars"
  | "Faculty Members"
  | "Industry Professionals"
  | "Other Participants";

export type RegistrationStatus = "Confirmed" | "Pending" | "Waitlisted" | "Cancelled";

export interface Registration {
  id: string;
  registrationId: string;
  fullName: string;
  email: string;
  mobileNumber: string;
  institution: string;
  department: string;
  designation: string;
  category: ParticipantCategory;
  cityState: string;
  areasOfInterest?: string;
  status: RegistrationStatus;
  createdAt: string;
  updatedAt?: string;
}

export interface RegistrationInput {
  fullName: string;
  email: string;
  mobileNumber: string;
  institution: string;
  department: string;
  designation: string;
  category: ParticipantCategory;
  cityState: string;
  areasOfInterest?: string;
}

export interface SpeakerCategory {
  id: string;
  title: string;
  roleDescription: string;
  status: "To Be Announced" | "Confirmed";
  iconName: string;
  speakersCount?: number;
}

export interface ScheduleItem {
  id: string;
  day: 1 | 2;
  date: string; // e.g. "28 December 2026"
  time: string; // e.g. "09:00 – 10:00"
  title: string;
  type: "inaugural" | "keynote" | "plenary" | "paper-session" | "break" | "invited-talk" | "panel" | "valedictory";
  isBreak?: boolean;
  highlightColor?: "cyan" | "purple" | "default";
  speaker?: string;
  venue?: string;
  notes?: string;
}

export interface TechnicalTrack {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
  iconType: "algorithms" | "hardware" | "applications" | "ml" | "communication";
  accentColor: string;
}

export interface Announcement {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "success";
  isActive: boolean;
  createdAt: string;
}

export interface AdminStats {
  totalRegistrations: number;
  byCategory: Record<ParticipantCategory, number>;
  byStatus: Record<RegistrationStatus, number>;
  topInstitutions: { name: string; count: number }[];
  recentRegistrations: Registration[];
}
