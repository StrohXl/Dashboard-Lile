import { NextResponse } from "next/server";

import { CreateListProduct } from "@/models/api/list_products";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { Products } from "@prisma/client";

export const updateProducts = async ({
  action,
  products,
}: {
  action: "increment" | "decrement";
  products: CreateListProduct;
}): ResponseService<Products> => {
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
      return NextResponse.json(
        { message: "error", status: 500 },
        { status: 500 }
      );
    }
  }
};
