import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export const deleteClientById = async (id: number) => {
  try {
    await prisma.clients.delete({ where: { id } });
    return NextResponse.json("Cliente Eliminado");
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("Cliente no encontrado", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
};
