import { NextRequest, NextResponse } from "next/server";
import { getRegistrations } from "@/lib/db";

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

  const registrations = getRegistrations();

  const headers = [
    "Registration ID",
    "Full Name",
    "Email",
    "Mobile Number",
    "Institution",
    "Department",
    "Designation",
    "Category",
    "City & State",
    "Areas of Interest",
    "Status",
    "Registration Date"
  ];

  const csvRows = [headers.join(",")];

  for (const r of registrations) {
    const row = [
      `"${r.registrationId.replace(/"/g, '""')}"`,
      `"${r.fullName.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.mobileNumber.replace(/"/g, '""')}"`,
      `"${r.institution.replace(/"/g, '""')}"`,
      `"${r.department.replace(/"/g, '""')}"`,
      `"${r.designation.replace(/"/g, '""')}"`,
      `"${r.category.replace(/"/g, '""')}"`,
      `"${r.cityState.replace(/"/g, '""')}"`,
      `"${(r.areasOfInterest || "").replace(/"/g, '""')}"`,
      `"${r.status.replace(/"/g, '""')}"`,
      `"${new Date(r.createdAt).toLocaleString("en-IN")}"`
    ];
    csvRows.push(row.join(","));
  }

  const csvContent = csvRows.join("\r\n");

  return new NextResponse(csvContent, {
    status: 200,
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="Quantum_Symposium_Registrations_${new Date().toISOString().slice(0, 10)}.csv"`
    }
  });
}
