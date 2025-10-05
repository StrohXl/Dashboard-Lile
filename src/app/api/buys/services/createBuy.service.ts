import { NextResponse } from "next/server";
import { ZodError } from "zod";
import prisma from "../../../../../libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { updateProducts } from "../../products/services";
import { createBodyBuy } from "../adapters";
import { calculateTotalPrice } from "@/utils";
import createBuyValidator, {
  CreateBuy,
} from "../validators/createBuy.validator";
import { CreateProduct } from "../../products/validators/product.validator";

export async function createBuy(body: CreateBuy, id: number) {
  const result = createBuyValidator(body);
  if (result instanceof ZodError) {
    console.error(result.issues);
    return NextResponse.json(result.issues, { status: 400 });
  }

  const { productsConnect, productsCreate } = createBodyBuy(body);
  
  const products: CreateProduct[] = body.products.map((item) => ({
    name: item.name,
    iva: item.iva,
    price: item.purchase_price,
    stock: item.stock,
    unit: item.unit,
  }));

  const listProducts = body.products;
  const totalPrice = calculateTotalPrice(products);

  try {
    await prisma.buys.create({
      data: {
        userId: id,
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

    return NextResponse.json(
      `Productos ${productsConnect ? "Actualizados" : "Creados"}`
    );
  } catch (error) {
    console.error(error);
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
