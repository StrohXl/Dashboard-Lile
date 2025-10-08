import { Prisma, Products } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";

export async function deleteProductById(id: number): ResponseService<Products> {
  try {
    const deleteProduct = await prisma.products.delete({ where: { id } });
    return NextResponse.json({
      message: "Producto Eliminado",
      status: 200,
      data: deleteProduct,
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "El Producto no pudo ser encontrado", status: 404 },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
