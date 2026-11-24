import { NextRequest, NextResponse } from "next/server";
import { getAnnouncements, saveAnnouncement } from "@/lib/db";

export async function GET() {
  const announcements = getAnnouncements();
  return NextResponse.json({ announcements });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, message, type, isActive } = body;

    if (!title || !message) {
      return NextResponse.json({ error: "Title and message are required" }, { status: 400 });
    }

    const created = saveAnnouncement({
      title,
      message,
      type: type || "info",
      isActive: isActive !== false
    });

    return NextResponse.json({ announcement: created }, { status: 201 });
  } catch (err) {
    console.error("Announcement error:", err);
    return NextResponse.json({ error: "Failed to create announcement" }, { status: 500 });
  }
}
