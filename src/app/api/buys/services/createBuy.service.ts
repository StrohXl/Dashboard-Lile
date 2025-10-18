import { Buys, Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreateBuy } from "@/models/api/buy";
import { ResponseService } from "@/models/response/responseService.model";
import { Token } from "@/models/token";

import prisma from "../../../../../libs/prisma";
import { updateProducts } from "../../products/services";
import { createBodyBuy } from "../adapters";
import createBuyValidator from "../validators/createBuy.validator";

export async function createBuy(
  body: CreateBuy,
  token: Token
): ResponseService<Buys> {
  const result = createBuyValidator(body);
  if (result instanceof ZodError) {
    console.error(result.issues);
    return NextResponse.json(
      { message: "El cuerpo de la solictud no funciona", status: 400 },
      { status: 400 }
    );
  }

  const { productsConnect, productsCreate } = createBodyBuy(body);

  const listProducts = body.products;
  const totalPrice = body.products.reduce(
    (previousValue, item) => previousValue + item.purchase_price,
    0
  );

  try {
    await prisma.buys.create({
      data: {
        User: {
          connect: { id: token.id },
        },
        products: {
          connect: productsConnect.map((item) => ({ id: item.id })),
          create: productsCreate,
        },
        list_products: {
          create: listProducts.map((item) => ({
            name: item.name,
            price: item.purchase_price,
            stock: item.stock,
            unit: item.unit,
          })),
        },
        total_price: totalPrice,
      },
      include: { products: true },
    });

    await updateProducts({ action: "increment", products: productsConnect });

    return NextResponse.json({
      message: `Productos ${productsConnect ? "Actualizados" : "Creados"}`,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { message: "Ya existe un producto con ese nombre", status: 400 },
          {
            status: 400,
          }
        );
      }
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Uno de los productos no existe", status: 404 },
          {
            status: 404,
          }
        );
      }
    }
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
