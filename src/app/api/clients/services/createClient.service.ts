import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import createClientValidator, {
  ZodClientSchema,
} from "../validators/createClient.validator";

export const createClient = async ({ body }: { body: ZodClientSchema }) => {
  const zodClient = createClientValidator(body);
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
