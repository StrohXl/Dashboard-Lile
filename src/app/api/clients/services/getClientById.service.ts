import { Clients, Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";

export const getClientById = async (id: number): ResponseService<Clients> => {
  try {
    const client = await prisma.clients.findUnique({
      where: {
        id,
      },
      include: {
        sales: true,
      },
    });
    if (!client) {
      return NextResponse.json(
        { message: "El cliente no existe", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Cliente encontrado",
      data: client,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `Errror ${error.code}`, status: 400 },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
};
