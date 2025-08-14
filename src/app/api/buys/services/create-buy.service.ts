import { NextResponse } from "next/server";
import { ListProduct } from "../../list-products/models";
import { ZodError } from "zod";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { updateProducts } from "../../products/services";
import { createBodyBuy } from "../adapters";
import { createListProduct } from "../../list-products/adapters";
import { getTotalPrice } from "../utilities";
import listProductValidator from "../../list-products/validators/list-product.validator";

export async function createBuy(body: ListProduct[], id: number) {
  for (let index = 0; index < body.length; index++) {
    const result = listProductValidator(body[index]);
    if (result instanceof ZodError) {
      console.log(result.issues);
      return NextResponse.json(result.issues, { status: 400 });
    }
  }

  const { productsConnect, productsCreate } = createBodyBuy(body);
  const listProducts = createListProduct(body);
  const totalPrice = getTotalPrice(body);
  try {
    await prisma.buys.create({
      data: {
        userId: id,
        products: {
          connect: productsConnect.map((item) => ({ id: item.id })),
          create: productsCreate,
        },
        list_products: {
          create: listProducts,
        },
        total_price: totalPrice,
      },
      include: { products: true },
    });
    await updateProducts(productsConnect);

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
        return NextResponse.json("Uno de los productos no existe", {
          status: 404,
        });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
