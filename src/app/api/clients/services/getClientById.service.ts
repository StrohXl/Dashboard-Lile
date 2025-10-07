import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export const getClientById = async (id: number) => {
  try {
    const client = await prisma.clients.findUnique({
      where: {
        id,
      },
      include:{
        sales:true
      }
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
