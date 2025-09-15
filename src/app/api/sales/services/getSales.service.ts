import prisma from "../../../../../libs/prisma";
import { ParamsRequest } from "@/models";
import { getPages } from "@/utils";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function getSales({ params }: { params: ParamsRequest }) {
  const { skip, take, pages } = await getPages("/sales", params);
  try {
    const sales = await prisma.sales.findMany({
      include: {
        list_products: true,
        client: true,
      },
      skip: skip,
      take: take,
      orderBy: {
        id: "desc",
      },
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
