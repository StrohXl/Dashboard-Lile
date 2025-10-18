import { Prisma, Products } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { Token } from "@/models/token";

export async function getProductById({
  id,
  token,
}: {
  id: number;
  token: Token;
}): ResponseService<Products> {
  try {
    const productId = await prisma.products.findUnique({
      where: { id, userId: token.id },
      cacheStrategy: {
        ttl: 3,
        tags: ["findIdProduct"],
      },
    });
    if (!productId) {
      return NextResponse.json(
        { message: "El Producto no existe", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data: productId,
      message: "Producto encontrado",
      status: 200,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      return NextResponse.json(
        { message: error.message, status: 500 },
        { status: 500 }
      );
    }
  }
}
