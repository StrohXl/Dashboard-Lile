import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { Token } from "@/models/token";

export async function getChangeById({
  id,
  token,
}: {
  id: number;
  token: Token;
}) {
  try {
    const change = await prisma.changeManager.findUnique({
      where: {
        id,
        userId: token.id,
      },
      include: {
        sale: true,
      },
    });
    if (!change) {
      return NextResponse.json(
        { message: "El cambio no fue encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json(change);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
