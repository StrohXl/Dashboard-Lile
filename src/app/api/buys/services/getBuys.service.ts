import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getPages } from "@/utils/getPages.utility";

export async function getBuys({ page }: { page: number }) {
  const { elementsPerPage, pages } = await getPages("buys");
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
    return NextResponse.json({ data: buys, pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}
