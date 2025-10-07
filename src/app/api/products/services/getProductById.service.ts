import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export async function getProductById(id: number) {
  try {
    const productId = await prisma.products.findUnique({
      where: { id },
      cacheStrategy: {
        ttl: 3,
        tags: ["findIdProduct"],
      },
    });
    if (!productId) {
      return NextResponse.json("El Producto no existe", { status: 404 });
    }
    return NextResponse.json(productId);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
  }
}
