import { NextRequest, NextResponse } from "next/server";
import { getRegistrations, updateRegistrationStatus, deleteRegistration, getAdminStats } from "@/lib/db";
import { RegistrationStatus } from "@/lib/types";

function checkAdminAuth(req: NextRequest): boolean {
  const cookie = req.cookies.get("nsqc_admin_auth");
  const authHeader = req.headers.get("authorization");
  const expectedKey = process.env.ADMIN_PASSWORD || "quantum2026admin";

  if (cookie?.value === "authenticated_session_token_2026") return true;
  if (authHeader && authHeader === `Bearer ${expectedKey}`) return true;
  return false;
}

export async function GET(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search")?.toLowerCase() || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const statsOnly = searchParams.get("stats") === "true";

  if (statsOnly) {
    return NextResponse.json(getAdminStats());
  }

  let registrations = getRegistrations();

  if (search) {
    registrations = registrations.filter(
      (r) =>
        r.fullName.toLowerCase().includes(search) ||
        r.email.toLowerCase().includes(search) ||
        r.institution.toLowerCase().includes(search) ||
        r.registrationId.toLowerCase().includes(search) ||
        r.cityState.toLowerCase().includes(search)
    );
  }

  if (category && category !== "All") {
    registrations = registrations.filter((r) => r.category === category);
  }

  if (status && status !== "All") {
    registrations = registrations.filter((r) => r.status === status);
  }

  const stats = getAdminStats();

  return NextResponse.json({
    registrations,
    stats,
    totalFiltered: registrations.length
  });
}

export async function PATCH(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Missing id or status" }, { status: 400 });
    }

    const updated = updateRegistrationStatus(id, status as RegistrationStatus);
    if (!updated) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    console.error("Update error:", err);
    return NextResponse.json({ error: "Failed to update registration" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  if (!checkAdminAuth(req)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing registration id" }, { status: 400 });
    }

    const deleted = deleteRegistration(id);
    if (!deleted) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Registration deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    return NextResponse.json({ error: "Failed to delete registration" }, { status: 500 });
  }
}
