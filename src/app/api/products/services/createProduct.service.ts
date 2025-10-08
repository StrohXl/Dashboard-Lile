import { Prisma, Products } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../../libs/prisma";
import productValidator from "../validators/product.validator";
import { ResponseService } from "@/models/response/responseService.model";
import { CreateProduct } from "@/models/api/product";

export async function createProduct(
  body: CreateProduct,
  id: number
): ResponseService<Products> {
  const result = productValidator(body);

  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud", status: 400 },
      {
        status: 400,
      }
    );
  }

  const { name, price, stock, unit, iva } = body;

  try {
    const newProduct = await prisma.products.create({
      data: {
        name,
        stock,
        price: price,
        unit,
        userId: id,
        iva,
        history_price: {
          create: {
            price: price,
          },
        },
      },
    });

    return NextResponse.json(
      { data: newProduct, message: "Producto  Creado", status: 200 },
      { status: 200 }
    );
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
    } else {
      return NextResponse.json(
        { message: "Error", status: 500 },
        { status: 500 }
      );
    }
  }
}
