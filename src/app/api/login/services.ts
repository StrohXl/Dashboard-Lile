import { PrismaClient } from "@prisma/client";
import TypeUser from "../users/type/typeUser";
import validInputs from "../users/utils/validInputs";
import { ZodError } from "zod";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();
export async function loginUser(body: TypeUser) {
  const validInputsUser = await validInputs(body);

  if (validInputsUser instanceof ZodError) {
    return NextResponse.json(validInputsUser.issues, { status: 400 });
  }
  const { email, password } = body;
  const key = process.env.JWT_KEY;
  const token = jwt.sign(
    { exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 1, email:body.email },
    key || ""
  );
  try {
    const findUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!findUser) {
      return NextResponse.json("Usuario o contraseña incorrectos", {
        status: 404,
      });
    }
    const serialized = serialize("myToken", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 1,
      path: "/",
    });

    return NextResponse.json(findUser, {
      headers: {
        "Set-Cookie": serialized,
      },
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
