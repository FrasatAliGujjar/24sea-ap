import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ======================= GET Attendance =======================
export async function GET() {
  try {
    const data = await prisma.attendance.findMany();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses", details: error.message },
      { status: 500 }
    );
  }
}

// ======================= ADD Attendance =======================
export async function POST(req) {
  try {
    const {
      course,
      date,
      time,
      absent_reg,
      no_present_std,
      no_absent_std,
      total_std,
    } = await req.json();

    const attendance = await prisma.attendance.create({
      data: {
        course,
        date,
        time,
        absent_reg,
        no_present_std,
        no_absent_std,
        total_std,
      },
    });

    return NextResponse.json(attendance, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to record attendance", details: error.message },
      { status: 500 }
    );
  }
}
