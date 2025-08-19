import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export const getClientById = async (id: number) => {
  try {
    const client = await prisma.clients.findUnique({
      where: {
        id,
      },
    });
    if (!client) {
      return NextResponse.json("El cliente no existe", { status: 404 });
    }
    return NextResponse.json(client);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error.code, { status: 400 });
    }
    return NextResponse.json("Error", { status: 500 });
  }
};
