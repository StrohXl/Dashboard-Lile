import prisma from "../../../../../libs/prisma";
import { NextResponse } from "next/server";
import { CreateProduct } from "../validators/product.validator";

export const updateStockProducts = async ({
  action,
  products,
}: {
  action: "increment" | "decrement";
  products: CreateProduct[];
}) => {
  for (let index = 0; index < products.length; index++) {
    try {
      await prisma.products.update({
        where: { id: products[index].id },
        data: {
          stock:
            action == "increment"
              ? {
                  increment: Number(products[index].stock),
                }
              : {
                  decrement: Number(products[index].stock),
                },
        },
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(error, { status: 500 });
    }
  }
};
