import { Clients, Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { UpdateClient } from "@/models/api/client";
import { ResponseService } from "@/models/response/responseService.model";
import { Token } from "@/models/token";

import prisma from "../../../../../libs/prisma";
import updateClientValidator from "../validators/updateClient.validator";

export async function updateClient({
  id,
  body,
  token,
}: {
  id: number;
  body: UpdateClient;
  token: Token;
}): ResponseService<Clients> {
  const bodyValidator = updateClientValidator(body);
  if (bodyValidator instanceof ZodError) {
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud", status: 400 },
      {
        status: 400,
      }
    );
  }
  body.name = body.name.toLocaleLowerCase();
  body.last_name = body.last_name.toLocaleLowerCase();
  try {
    const client = await prisma.clients.update({
      data: { ...body, user: { connect: { id: token.id } } },
      where: {
        id: id,
      },
    });
    return NextResponse.json({
      data: client,
      message: "Cliente editado",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Cliente no encontrado", status: 404 },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
