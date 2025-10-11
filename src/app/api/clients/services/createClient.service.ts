import { Clients, Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreateClient } from "@/models/api/client";

import prisma from "../../../../../libs/prisma";
import createClientValidator from "../validators/createClient.validator";
import { ResponseService } from "@/models/response/responseService.model";

export const createClient = async ({
  body,
}: {
  body: CreateClient;
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
      data: body,
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
