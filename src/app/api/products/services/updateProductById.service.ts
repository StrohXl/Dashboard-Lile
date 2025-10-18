import { Prisma, Products } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreateProduct } from "@/models/api/product";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import productValidator from "../validators/product.validator";
import { Token } from "@/models/token";

export async function updateProductById({
  body,
  id,
  token,
}: {
  body: CreateProduct;
  id: number;
  token: Token;
}): ResponseService<Products> {
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
        User: {
          connect: {
            id: token.id,
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
