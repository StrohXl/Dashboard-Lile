import { Prisma, Products } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../../libs/prisma";
import productValidator from "../validators/product.validator";
import { ResponseService } from "@/models/response/responseService.model";
import { CreateProduct } from "@/models/api/product";

export async function updateProductById(
  body: CreateProduct,
  id: number
): ResponseService<Products> {
  const result = productValidator(body);

  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(
      { message: "Cuerpo de la solicitud invalido", status: 400 },
      { status: 400 }
    );
  }

  const { name, price, stock, unit, iva } = body;

  try {
    const productUpdate = await prisma.products.update({
      data: {
        name,
        price,
        stock,
        unit,
        iva,
        history_price: {
          create: {
            price,
          },
        },
      },
      where: { id },
    });

    return NextResponse.json({
      message: "Producto Actualizado",
      status: 200,
      data: productUpdate,
    });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Un producto ya tiene ese nombre", status: 400 },
          {
            status: 400,
          }
        );
      }
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "El Producto no existe", status: 404 },
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
