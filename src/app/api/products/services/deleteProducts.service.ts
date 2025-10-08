import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { Products } from "@prisma/client";

export async function deleteProducts(
  products: number[]
): ResponseService<Products> {
  try {
    await prisma.products.deleteMany({
      where: {
        id: {
          in: products,
        },
      },
    });

    return NextResponse.json({ message: "Productos Eliminados", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
