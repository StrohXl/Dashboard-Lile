import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export async function deleteHistoryPriceById({ id }: { id: number }) {
  try {
    await prisma.historyPrice.delete({
      where: {
        id,
      },
    });
    return NextResponse.json("Precio eliminado");
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
          return NextResponse.json("Precio no encontrado", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
