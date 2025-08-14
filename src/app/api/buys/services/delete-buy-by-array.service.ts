import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function deleteBuys(ids: number[]) {
  try {
    for (let index = 0; index < ids.length; index++) {
      const buy = await prisma.buys.findUnique({
        where: { id: ids[index] },
      });
      if (!buy) {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    await prisma.buys.deleteMany({ where: { id: { in: ids } } });

    return NextResponse.json("Compras Eliminadas");
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
