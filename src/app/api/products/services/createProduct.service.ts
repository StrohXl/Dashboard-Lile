import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../../libs/prisma";
import { Product } from "../models";
import productValidator from "../validators/product.validator";

export async function createProduct(body: Product, id: number) {
  const result = productValidator(body);

  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json("Error en el cuerpo de la solicitud", {
      status: 400,
    });
  }

  const { name, price, stock, unit, iva } = body;

  try {
    await prisma.products.create({
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

    return NextResponse.json({ message: "Producto  Creado" });
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json("Un producto ya tiene ese nombre", {
          status: 400,
        });
      }
    } else {
      return NextResponse.json("Error", { status: 500 });
    }
  }
}
