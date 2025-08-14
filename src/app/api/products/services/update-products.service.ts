import prisma from "@/libs/prisma";
import { Product } from "../models";
import { NextResponse } from "next/server";

export const updateProducts = async (products: Product[]) => {
  for (let index = 0; index < products.length; index++) {
    try {
      await prisma.products.update({
        where: { id: products[index].id },
        data: {
          price: products[index].price,
          stock: {
            increment: Number(products[index].stock),
          },
        },
      });
    } catch (error) {
      console.log(error);
      return NextResponse.json(error, { status: 500 });
    }
  }
};
