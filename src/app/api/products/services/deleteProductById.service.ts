import prisma from "../../../../../libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function deleteProductById(id: number) {
  try {
    await prisma.products.delete({ where: { id } });
    return NextResponse.json({ message: "Producto Eliminado" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { error: "El Producto no pudo ser encontrado" },
          { status: 404 }
        );
      } else {
        return NextResponse.json("Error", { status: 500 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
