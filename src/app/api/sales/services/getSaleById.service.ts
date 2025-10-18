import { Sales } from "@prisma/client";
import { NextResponse } from "next/server";

import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { Token } from "@/models/token";

export async function getSaleById({
  id,
  token,
}: {
  id: number;
  token: Token;
}): ResponseService<Sales> {
  try {
    const sale = await prisma.sales.findUnique({
      where: {
        id,
        userId: token.id,
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
