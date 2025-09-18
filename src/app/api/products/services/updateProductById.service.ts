import { ZodError } from "zod";
import { Product } from "../models";
import productValidator from "../validators/product.validator";
import { NextResponse } from "next/server";
import prisma from "../../../../../libs/prisma";
import { Prisma } from "@prisma/client/edge";

export async function updateProductById(body: Product, id: number) {
  const result = productValidator(body);

  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(result.issues, { status: 400 });
  }

  const { name, price, stock, unit } = body;

  try {
    const productUpdate = await prisma.products.update({
      data: {
        name,
        price,
        stock,
        unit,
        history_price: {
          create: {
            price,
          },
        },
      },
      where: { id },
    });

    return NextResponse.json(productUpdate);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json("Un producto ya tiene ese nombre", {
          status: 400,
        });
      }
      if (error.code === "P2025") {
        return NextResponse.json("El Producto no existe", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
