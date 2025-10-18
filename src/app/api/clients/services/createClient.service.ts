import { Clients, Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreateClient } from "@/models/api/client";
import { ResponseService } from "@/models/response/responseService.model";
import { Token } from "@/models/token";

import prisma from "../../../../../libs/prisma";
import createClientValidator from "../validators/createClient.validator";

export const createClient = async ({
  body,
  token,
}: {
  body: CreateClient;
  token: Token;
}): ResponseService<Clients> => {
  const zodClient = createClientValidator(body);
  if (zodClient instanceof ZodError) {
    console.error(zodClient);
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
    const sale = await prisma.clients.create({
      data: { ...body, user: { connect: { id: token.id } } },
    });
    return NextResponse.json({
      message: "Cliente creado",
      data: sale,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        return NextResponse.json(
          { message: "Ya existe un cliente con esta cedula", status: 400 },
          {
            status: 400,
          }
        );
      }
    }
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
};
