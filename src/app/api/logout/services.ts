import { NextRequest, NextResponse } from "next/server";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import { cookies } from "next/headers";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function logoutUser(request: NextRequest) {
  const cookiesRequest = request.cookies;
  const token = cookiesRequest.get("myToken");

  
  if (token) {
    try {
      const res = addTokenToBlackList(token.value);
      if (res instanceof Prisma.PrismaClientKnownRequestError) {
        return NextResponse.json({ error: "Error al cerrar" }, { status: 400 });
      }
      const cookieStore = await cookies();
      cookieStore.delete("myToken");
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      if (error instanceof JsonWebTokenError) {
        return NextResponse.json(error.message, { status: 500 });
      }
      return NextResponse.json(error, { status: 500 });
    }
  } else {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export async function addTokenToBlackList(token: string) {
  const key = process.env.JWT_KEY;
  const { id } = jwt.verify(token, key || "") as { id: number };
  const addedToken = prisma.blackListToken.create({
    data: {
      token,
      userId: id,
    },
  });

  return addedToken;
}
