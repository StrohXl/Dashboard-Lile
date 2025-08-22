import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function deleteProducts(products: number[]) {
  try {
    for (let index = 0; index < products.length; index++) {
      const product = await prisma.products.findUnique({
        where: { id: products[index] },
      });
      if (!product) {
        return NextResponse.json("El Producto no existe", { status: 404 });
      }
    }
    await prisma.products.deleteMany({
      where: {
        id: {
          in: products,
        },
      },
    });

    return NextResponse.json({ message: "Productos Eliminados" });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("El Producto no existe", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
