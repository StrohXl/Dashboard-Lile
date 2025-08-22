import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function getSales() {
  try {
    const sales = await prisma.sales.findMany({
      include: {
        list_products: true,
        client: true,
        payments: true
      },
    });
    return NextResponse.json(sales);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
