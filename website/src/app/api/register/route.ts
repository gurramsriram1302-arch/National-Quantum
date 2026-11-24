import { NextRequest, NextResponse } from "next/server";
import { createRegistration, getRegistrationByEmail } from "@/lib/db";
import { RegistrationInput, ParticipantCategory } from "@/lib/types";

const VALID_CATEGORIES: ParticipantCategory[] = [
  "Students",
  "Research Scholars",
  "Faculty Members",
  "Industry Professionals",
  "Other Participants"
];

// Helper to validate email format
function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Helper to validate phone number (at least 7 digits, allowed +, -, spaces)
function isValidPhone(phone: string): boolean {
  const clean = phone.replace(/[^0-9]/g, "");
  return clean.length >= 7 && clean.length <= 15;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      mobileNumber,
      institution,
      department,
      designation,
      category,
      cityState,
      areasOfInterest
    } = body;

    // Field validations
    if (!fullName || typeof fullName !== "string" || fullName.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your full name (minimum 2 characters)." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !isValidEmail(email.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!mobileNumber || typeof mobileNumber !== "string" || !isValidPhone(mobileNumber.trim())) {
      return NextResponse.json(
        { error: "Please provide a valid mobile or phone number." },
        { status: 400 }
      );
    }

    if (!institution || typeof institution !== "string" || institution.trim().length < 2) {
      return NextResponse.json(
        { error: "Please specify your institution or organisation." },
        { status: 400 }
      );
    }

    if (!department || typeof department !== "string" || department.trim().length < 2) {
      return NextResponse.json(
        { error: "Please enter your department." },
        { status: 400 }
      );
    }

    if (!designation || typeof designation !== "string" || designation.trim().length < 1) {
      return NextResponse.json(
        { error: "Please select or enter your designation." },
        { status: 400 }
      );
    }

    if (!category || !VALID_CATEGORIES.includes(category as ParticipantCategory)) {
      return NextResponse.json(
        { error: `Please choose a valid participant category (${VALID_CATEGORIES.join(", ")}).` },
        { status: 400 }
      );
    }

    if (!cityState || typeof cityState !== "string" || cityState.trim().length < 2) {
      return NextResponse.json(
        { error: "Please specify your city and state." },
        { status: 400 }
      );
    }

    // Check duplicate
    const existing = getRegistrationByEmail(email.trim());
    if (existing) {
      return NextResponse.json(
        {
          error: `This email (${email}) is already registered with Registration ID: ${existing.registrationId}. Please contact the organising committee if you require modifications.`,
          alreadyRegistered: true,
          registrationId: existing.registrationId
        },
        { status: 409 }
      );
    }

    const inputData: RegistrationInput = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      mobileNumber: mobileNumber.trim(),
      institution: institution.trim(),
      department: department.trim(),
      designation: designation.trim(),
      category: category as ParticipantCategory,
      cityState: cityState.trim(),
      areasOfInterest: typeof areasOfInterest === "string" ? areasOfInterest.trim() : ""
    };

    const result = createRegistration(inputData);

    if (!result.success || !result.registration) {
      return NextResponse.json(
        { error: result.error || "Failed to process registration." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Registration successful! Welcome to the National Symposium on Quantum Computing 2026.",
        registration: result.registration
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("Registration error:", err);
    return NextResponse.json(
      { error: "Internal server error occurred while submitting registration." },
      { status: 500 }
    );
  }
}
