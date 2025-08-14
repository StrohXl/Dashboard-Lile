import { ZodError } from "zod";
import { Product } from "../models";
import { NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import productValidator from "../validators/product.validator";

export async function createProduct(body: Product, id: number) {
  const result = productValidator(body);

  if (result instanceof ZodError) {
    console.log(result.issues);
    return NextResponse.json(result.issues, { status: 400 });
  }

  const { name, price, stock } = body;
  try {
    await prisma.products.create({
      data: { name, stock, price, userId: id },
    });

    return NextResponse.json({ message: "Producto  Creado" });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error);
      if (error.code === "P2002") {
        return NextResponse.json("Un producto ya tiene ese nombre", {
          status: 400,
        });
      }
    } else {
      return NextResponse.json(error, { status: 500 });
    }
  }
}
