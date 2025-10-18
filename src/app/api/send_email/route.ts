import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../libs/prisma";
import { confirmEmail } from "./services/confirmEmail.service";
import {
  SendEmail,
  SendEmailValidator,
} from "./validators/sendEmail.validator";

export async function POST(request: NextRequest) {
  const body: SendEmail = await request.json();
  const bodyValidated = SendEmailValidator(body);
  if (bodyValidated instanceof ZodError) {
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud" },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });
    if (user && user.verified === true)
      return NextResponse.json(
        { message: "Ya existe una cuenta con ese correo" },
        { status: 400 }
      );
    else return await confirmEmail({ body });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
