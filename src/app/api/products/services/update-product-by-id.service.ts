import { ZodError } from "zod";
import { Product } from "../models";
import productValidator from "../validators/product.validator";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export async function updateProductById(body: Product, id: number) {
  const result = productValidator(body);
  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(result.issues, { status: 400 });
  }
  const { name, price, stock } = body;
  try {
    const productUpdate = await prisma.products.update({
      data: {
        name,
        price,
        stock,
      },
      where: { id },
    });

    return NextResponse.json(productUpdate);
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("El Producto no existe", { status: 404 });
      } else {
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
