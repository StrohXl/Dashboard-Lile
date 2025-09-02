import prisma from "@/libs/prisma";
import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

export async function getProducts({
  page,
  name,
  all,
}: {
  name: string | null;
  page: number;
  all: string;
}) {
  const { elementsPerPage, pages } = await getPages("/products");
  try {
    const products = await prisma.products.findMany({
      orderBy: { id: "desc" },
      skip:
        all == "false"
          ? page == 0
            ? page
            : (page - 1) * elementsPerPage
          : undefined,
      take: all == "false" ? elementsPerPage : undefined,
      where: {
        name: {
          contains: name ?? "",
        },
      },
      cacheStrategy: {
        ttl: 2,
        tags: ["findProducts"],
      },
    });
    return NextResponse.json({ data: products, pages: pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
