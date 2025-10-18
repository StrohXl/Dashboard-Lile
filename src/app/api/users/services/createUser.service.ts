import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreateUser } from "@/models/api/user/createUser.model";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { createUserValidator } from "../validators/createUser.validator";

export async function createUser({
  body,
}: {
  body: CreateUser;
}): ResponseService<User> {
  const bodyValidated = createUserValidator({ body });
  if (bodyValidated instanceof ZodError) {
    console.error(bodyValidated);
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud", status: 400 },
      { status: 400 }
    );
  }
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        token: body.token,
        verified: false,
      },
    });
    if (user && user.email == body.email && user.token == body.token) {
      await prisma.user.update({
        where: {
          email: body.email,
          token: body.token,
        },
        data: {
          name: body.name,
          last_name: body.last_name,
          verified: true,
          password: body.password,
        },
      });
      return NextResponse.json({ message: "Usuario  creado", status: 200 });
    }
    return NextResponse.json(
      { message: "Usuario no validado", status: 400 },
      { status: 400 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
