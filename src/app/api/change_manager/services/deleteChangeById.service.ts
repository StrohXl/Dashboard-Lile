import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function deleteChangeById(id: number) {
  try {
    await prisma.changeManager.delete({
      where: {
        id,
      },
    });
    return NextResponse.json("Cambio eliminado");
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2025") {
        return NextResponse.json("El cambio no existe", { status: 404 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
