import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import clientValidator, {
  ZodClientSchema,
} from "../validators/create.client.validator";
import { ZodError } from "zod";

export const createClient = async ({ body }: { body: ZodClientSchema }) => {
  const zodClient = clientValidator(body);
  if (zodClient instanceof ZodError) {
    console.log(zodClient);
    return NextResponse.json("Error en el cuerpo de la solicitud", {
      status: 400,
    });
  }
  try {
    const sale = await prisma.clients.create({
      data: body,
    });
    return NextResponse.json(sale);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error.code, { status: 400 });
    }
    return NextResponse.json("Error", { status: 500 });
  }
};
