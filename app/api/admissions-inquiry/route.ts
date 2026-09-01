import { NextResponse } from "next/server";
import { createAdmissionsInquiry, getAdmissionsInquiries } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, program, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, Email, and Phone are required." },
        { status: 400 }
      );
    }

    const success = await createAdmissionsInquiry({
      name,
      email,
      phone,
      program,
      message,
    });

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Your inquiry has been submitted to admissions successfully!",
      });
    }

    return NextResponse.json(
      { success: false, error: "Failed to save inquiry." },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await getAdmissionsInquiries();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
