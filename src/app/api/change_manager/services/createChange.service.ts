import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../../libs/prisma";
import validatedChangeManager from "../validators/createChange.validator";
import { CreateChangeManager } from "@/models/change_manager/createChangeManager.model";

export async function createChange({ body }: { body: CreateChangeManager }) {
  const validatedBody = validatedChangeManager(body);

  if (validatedBody instanceof ZodError) {
    console.error(validatedBody);
    return NextResponse.json("Hubo un error en el cuerpo de la solicitud", {
      status: 400,
    });
  }

  try {
    const newChange = await prisma.changeManager.create({
      data: {
        change_amount: body.change_amount,
        change_method: body.change_method,
        operation: body.operation,
        sale_id: body.sale_id,
      },
    });
    return NextResponse.json(newChange);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
