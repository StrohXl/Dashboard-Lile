import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getPagesBuys } from "./get-pages-buys.service";

export async function getBuys({
  page,
  elementsPerPage,
}: {
  page: number;
  elementsPerPage: number;
}) {
  try {
    const buys = await prisma.buys.findMany({
      include: {
        list_products: true,
        products: true,
        User: true,
      },
      skip: (Number(page) - 1) * elementsPerPage,
      take: elementsPerPage,
      orderBy: { id: "desc" },
      cacheStrategy: { ttl: 2, tags: ["findBuys"] },
    });
    const pages = await getPagesBuys(elementsPerPage);
    return NextResponse.json({ data: buys, pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
