import { Prisma, Products } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";

export async function getProductById(id: number): ResponseService<Products> {
  try {
    const productId = await prisma.products.findUnique({
      where: { id },
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
