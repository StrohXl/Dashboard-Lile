import { NextResponse } from "next/server";
import prisma from "../../../../libs/prisma";
import { Prisma } from "@prisma/client/edge";

export async function getUser() {
  const users = await prisma.user.findMany({ omit: { password: true } });
  return NextResponse.json(users);
}

export async function getUserId(id: number) {
  try {
    const userId = await prisma.user.findUnique({ where: { id } });
    if (!userId) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(userId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
