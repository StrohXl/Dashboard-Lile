import { HistoryPrice } from "@prisma/client";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export async function getHistoryPriceById({ id }: { id: number }) {
  const prices: number[] = [];
  const filterHistory: HistoryPrice[] = [];
  try {
    const historyPrice = await prisma.historyPrice.findMany({
      where: {
        products_id: id,
      },
      orderBy: {
        id: "desc",
      },
      cacheStrategy: {
        ttl: 5,
      },
      take: 50,
    });

    historyPrice.forEach((item) => {
      if (!prices.includes(Number(item.price))) {
        prices.push(Number(item.price));
        filterHistory.push(item);
      }
    });

    if (historyPrice.length == 0) {
      return NextResponse.json(
        "No se encontro un historial de precios para este producto",
        { status: 404 }
      );
    }
    return NextResponse.json({ data: filterHistory, pages: 0 });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
