import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../../libs/prisma";
import { ValidateUserModel } from "../model/validateUser.model";
import { validateUserValidator } from "../validators/validateUser.validator";

export async function validateUser(body: ValidateUserModel) {
  const validateBody = validateUserValidator(body);
  if (validateBody instanceof ZodError) {
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud" },
      { status: 400 }
    );
  }

  try {
    const user = prisma.user.findUnique({
      where: {
        email: body.email,
        token: body.token,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "Token invalido" }, { status: 404 });
    }
    return NextResponse.json({ message: "Usuario encontrado", data: user });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
