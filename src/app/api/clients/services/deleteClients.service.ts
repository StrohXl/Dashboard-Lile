import prisma from "../../../../../libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export const deleteClientByArray = async (ids: number[]) => {
  try {
    await prisma.clients.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return NextResponse.json("Clientes Eliminados");
  } catch (error) {
    console.error(error)
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error.message, { status: 500 });
    }
    return NextResponse.json("Error", { status: 500 });
  }
};
