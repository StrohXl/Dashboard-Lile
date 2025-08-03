import { Prisma, PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import TypeProduct from "../products/type/typeProducts";
import { createProduct, getProductId } from "../products/services";
import { connect } from "http2";
import validInputs from "../products/utils/validInputs";
import { ZodError } from "zod";

const prisma = new PrismaClient();

export async function getBuys(request: NextRequest) {
  const buys = await prisma.buys.findMany({
    include: {
      products: true,
    },
  });
  return NextResponse.json(buys);
}

export async function createBuy(body: TypeProduct[], id: number) {
  for (let index = 0; index < body.length; index++) {
    const result = validInputs(body[index]);
    if (result instanceof ZodError) {
      console.log(result.issues);
      return NextResponse.json(result.issues, { status: 400 });
    }
  }

  const productsConnect = body.filter((item) => item.id);
  const productsCreate = body.filter((item) => !item.id);

  try {
    await prisma.buys.create({
      data: {
        userId: id,
        products: {
          connect: productsConnect.map((item) => ({ id: item.id })),
          create: productsCreate,
        },
      },
      include: { products: true },
    });

    for (let index = 0; index < productsConnect.length; index++) {
      await prisma.products.update({
        where: { id: productsConnect[index].id },
        data: productsConnect[index],
      });
    }

    return NextResponse.json(
      `Productos ${productsConnect ? "Actualizados" : "Creados"}`
    );
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json("Ya existe un producto con ese nombre", {
          status: 400,
        });
      }
      if (error.code === "P2025") {
        return NextResponse.json(
          "Uno de los productos seleccinados no existe",
          {
            status: 404,
          }
        );
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
