import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function getBuyById(id: number) {
  try {
    const buy = await prisma.buys.findUnique({
      where: { id: id },
      include: { list_products: true },
      cacheStrategy: {
        ttl: 60,
        tags: ["findIdBuy"],
      },
    });
    return NextResponse.json(buy);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("La compra no existe", { status: 404 });
      }
    }
    return NextResponse.json(error, { status: 500 });
  }
}
