import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { CreateListProduct } from "../../list-products/validators/createListProduct.validator";

export const updateProducts = async ({
  action,
  products,
}: {
  action: "increment" | "decrement";
  products: CreateListProduct;
}) => {
  for (let index = 0; index < products.length; index++) {
    try {
      await prisma.products.update({
        where: { id: products[index].id },
        data: {
          price: products[index].price,
          history_price: {
            create: {
              price: products[index].price,
            },
          },
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
