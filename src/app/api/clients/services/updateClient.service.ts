import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { UpdateClient } from "../validators";
import updateClientValidator from "../validators/updateClient.validator";

export async function updateClient({
  id,
  body,
}: {
  id: number;
  body: UpdateClient;
}) {
  const bodyValidator = updateClientValidator(body);
  if (bodyValidator instanceof ZodError) {
    return NextResponse.json("Error en el cuerpo de la solicitud", {
      status: 400,
    });
  }
  try {
    const client = await prisma.clients.update({
      data: body,
      where: {
        id: id,
      },
    });
    return NextResponse.json(client);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("Cliente no encontrado", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
