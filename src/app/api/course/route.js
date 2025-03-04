import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ======================= GET Courses =======================
export async function GET() {
  try {
    const courses = await prisma.courses.findMany();
    return NextResponse.json(courses);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch courses", details: error.message },
      { status: 500 }
    );
  }
}

// ======================= ADD Course =======================
export async function POST(req) {
  try {
    const { CName, Teacher } = await req.json();

    const course = await prisma.courses.create({
      data: { CName, Teacher },
    });

    return NextResponse.json(course, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add course", details: error.message },
      { status: 500 }
    );
  }
}

// ======================= DELETE Course (By CName) =======================
export async function DELETE(request) {
  try {
    const { CName } = await request.json();

    if (!CName) {
      return NextResponse.json(
        { error: "Course Name (CName) is required for deletion" },
        { status: 400 }
      );
    }

    await prisma.courses.delete({
      where: { CName },
    });

    return NextResponse.json(
      { message: "Course deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete course", details: error.message },
      { status: 500 }
    );
  }
}

// ======================= UPDATE Course (By CName) =======================
export async function PATCH(request) {
  try {
    const { CName, Teacher } = await request.json();

    if (!CName) {
      return NextResponse.json(
        { error: "Course Name (CName) is required for updating" },
        { status: 400 }
      );
    }

    const updatedCourse = await prisma.courses.update({
      where: { CName },
      data: { CName, Teacher },
    });

    return NextResponse.json(updatedCourse, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update course", details: error.message },
      { status: 500 }
    );
  }
}
