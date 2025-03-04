import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// ======================= GET STUDENT =======================
export async function GET() {
  try {
    const data = await prisma.student.findMany();
    return NextResponse.json(data);
  } catch (error) {
    // -------------------------------------------------
    return NextResponse.json(
      { error: "Failed to fetch users", details: error.message },
      { status: 500 }
    );
  }
}

// ======================= ADD STUDENT =======================
export async function POST(req) {
  try {
    const { reg, fullName } = await req.json();

    const student = await prisma.student.create({
      data: { reg, fullName },
    });

    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add student", details: error.message },
      { status: 500 }
    );
  }
}

// ======================= DELETE STUDENT =======================

// Delete Api
export async function DELETE(request) {
  try {
    const { reg } = await request.json();

    if (!reg) {
      return NextResponse.json(
        { error: "User ID is required for deletion" },
        { status: 400 }
      );
    }

    await prisma.student.delete({
      where: { reg },
    });

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete user", details: error.message },
      { status: 500 }
    );
  }
}

// ======================= UPDATE STUDENT =======================
export async function PATCH(request) {
  try {
    const { reg, fullName } = await request.json();

    if (!reg) {
      return NextResponse.json(
        { error: "User ID is required for updating" },
        { status: 400 }
      );
    }

    const updatedUser = await prisma.student.update({
      where: { reg },
      data: { reg, fullName },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user", details: error.message },
      { status: 500 }
    );
  }
}
