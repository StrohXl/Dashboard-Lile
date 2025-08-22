import prisma from "@/libs/prisma";
import { CreateProduct } from "../models";
import { NextResponse } from "next/server";

export const updateStockProducts = async ({
  action,
  products,
}: {
  action: "increment" | "decrement";
  products: CreateProduct[];
}) => {
  if (action == "increment") {
    for (let index = 0; index < products.length; index++) {
      try {
        await prisma.products.update({
          where: { id: products[index].id },
          data: {
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
  }
  if (action == "decrement") {
    for (let index = 0; index < products.length; index++) {
      console.log('restando')
      try {
        await prisma.products.update({
          where: { id: products[index].id },
          data: {
            stock: {
              decrement: Number(products[index].stock),
            },
          },
        });
      } catch (error) {
        console.log(error);
        return NextResponse.json(error, { status: 500 });
      }
    }
  }
};
