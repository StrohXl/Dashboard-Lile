import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function deleteSales(ids: number[]) {
  try {
    await prisma.sales.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return NextResponse.json('Ventas eliminadas')
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
