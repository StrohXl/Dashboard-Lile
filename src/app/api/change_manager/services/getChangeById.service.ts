import prisma from "../../../../../libs/prisma";
import { NextResponse } from "next/server";

export async function getChangeById(id: number) {
  try {
    const change = await prisma.changeManager.findUnique({
      where: {
        id,
      },
      include: {
        sale: true,
      },
    });
    if (!change) {
      return NextResponse.json("El cambio no fue encontrado", { status: 404 });
    }
    return NextResponse.json(change);
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
