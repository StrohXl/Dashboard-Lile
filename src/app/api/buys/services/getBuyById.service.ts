import { Buys } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";

export async function getBuyById(id: number): ResponseService<Buys> {
  try {
    const buy = await prisma.buys.findUnique({
      where: { id: id },
      include: { list_products: true, User: true },
      cacheStrategy: {
        ttl: 10,
        tags: ["findIdBuy"],
      },
    });
    if (!buy) {
      return NextResponse.json(
        { message: "La compra no existe", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data: buy,
      message: "Compra encontrada",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
