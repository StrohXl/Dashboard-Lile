import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { Sales } from "@prisma/client";

export async function getSaleById(id: number): ResponseService<Sales> {
  try {
    const sale = await prisma.sales.findUnique({
      where: {
        id,
      },
      include: {
        list_products: true,
        client: true,
        payments: true,
        change_manager: true,
      },
    });
    if (!sale) {
      return NextResponse.json(
        { message: "Venta no encontrada", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json({
      message: "Venta encontrada",
      status: 200,
      data: sale,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
