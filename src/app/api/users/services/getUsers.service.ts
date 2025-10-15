import { NextResponse } from "next/server";
import prisma from "../../../../../libs/prisma";

export async function getUsers() {
  const users = await prisma.user.findMany({
    omit: { password: true, token: true, role: true, verified: true },
  });
  return NextResponse.json(users);
}
