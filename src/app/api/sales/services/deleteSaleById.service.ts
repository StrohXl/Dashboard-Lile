import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export async function deleteSaleById(id: number) {
  try {
    await prisma.sales.delete({
      where: {
        id,
      },
    });
    return NextResponse.json("Venta eliminada");
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("La venta no existe", {
          status: 404,
        });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
