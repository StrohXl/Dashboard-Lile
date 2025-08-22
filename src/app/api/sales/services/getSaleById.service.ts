import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function getSaleById(id: number) {
  try {
    const sale = await prisma.sales.findUnique({
      where: {
        id,
      },
      include: {
        list_products: true,
        client: true,
        payments: true,
      },
    });
    if (!sale) {
      return NextResponse.json("Venta no encontrada", { status: 404 });
    }
    return NextResponse.json(sale);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
