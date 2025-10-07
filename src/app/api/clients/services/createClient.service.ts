import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../../libs/prisma";
import createClientValidator from "../validators/createClient.validator";
import { CreateClient } from "@/models/client";

export const createClient = async ({ body }: { body: CreateClient }) => {
  const zodClient = createClientValidator(body);
  if (zodClient instanceof ZodError) {
    console.error(zodClient);
    return NextResponse.json("Error en el cuerpo de la solicitud", {
      status: 400,
    });
  }
  body.name = body.name.toLocaleLowerCase();
  body.last_name = body.last_name.toLocaleLowerCase();
  try {
    const sale = await prisma.clients.create({
      data: body,
    });
    return NextResponse.json(sale);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code == "P2002") {
        return NextResponse.json("Ya existe un cliente con esta cedula", {
          status: 400,
        });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
};
