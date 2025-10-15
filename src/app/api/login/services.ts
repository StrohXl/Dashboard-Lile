import prisma from "@/../libs/prisma";
import bcrypt from "bcrypt";
import { serialize } from "cookie";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import TypeUser from "../users/type/typeUser";
import validInputs from "../users/utils/validInputs";

export async function loginUser(body: TypeUser) {
  const validInputsUser = await validInputs(body);

  if (validInputsUser instanceof ZodError) {
    return NextResponse.json(validInputsUser.issues, { status: 400 });
  }
  const { email, password } = body;

  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!findUser) {
      return NextResponse.json(
        { message: "Usuario o contraseña incorrectos" },
        {
          status: 404,
        }
      );
    } else {
      const verifyPassword = await bcrypt.compare(password, findUser?.password);
      if (!verifyPassword) {
        return NextResponse.json(
          { message: "Usuario o contraseña incorrectos" },
          {
            status: 404,
          }
        );
      }
      const key = process.env.JWT_KEY;
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1,
          email: body.email,
          id: findUser.id,
        },
        key || ""
      );
      const serialized = serialize("myToken", token, {
        httpOnly: true,
        sameSite: "strict",
        path: "/",
      });

      return NextResponse.json("Usuario encontrado", {
        headers: {
          "Set-Cookie": serialized,
        },
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
