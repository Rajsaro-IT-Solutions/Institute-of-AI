import { NextResponse } from "next/server";
import { createDemoBooking, getDemoBookings } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, preferredTopic, preferredDate, message } = body;

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "Name, Email, and Phone are required." },
        { status: 400 }
      );
    }

    const success = await createDemoBooking({
      name,
      email,
      phone,
      preferredTopic,
      preferredDate,
      message,
    });

    if (success) {
      return NextResponse.json({
        success: true,
        message: "Your free demo class has been booked successfully!",
      });
    }

    return NextResponse.json(
      { success: false, error: "Failed to save demo booking." },
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
    const data = await getDemoBookings();
    return NextResponse.json({ success: true, data });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
