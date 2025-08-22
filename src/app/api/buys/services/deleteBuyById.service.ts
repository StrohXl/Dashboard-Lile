import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function deleteBuyById(id: number) {
  try {
    await prisma.buys.delete({ where: { id } });

    return NextResponse.json("Compra Eliminada");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
