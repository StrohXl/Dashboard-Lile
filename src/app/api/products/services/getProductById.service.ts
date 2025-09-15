import prisma from "../../../../../libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function getProductById(id: number) {
  try {
    const productId = await prisma.products.findUnique({
      where: { id },
      cacheStrategy: {
        ttl: 2,
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
