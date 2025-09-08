import prisma from "@/libs/prisma";
import { getPages } from "@/utils";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function getSales({ page, all }: { page: number; all: string }) {
  const { elementsPerPage, pages } = await getPages("/sales");
  try {
    const sales = await prisma.sales.findMany({
      include: {
        list_products: true,
        client: true,
        payments: true,
      },
      skip: page == 0 ? page : (page - 1) * elementsPerPage,
      take: all == "false" ? elementsPerPage : undefined,
      orderBy:{
        id: 'desc'
      }
    });
    return NextResponse.json({ data: sales, pages });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error.message, { status: 400 });
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
