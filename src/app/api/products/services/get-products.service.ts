import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function getProducts({
  page,
  name,
  all,
  elementsPerPage,
}: {
  name: string | null;
  page: number;
  all: string;
  elementsPerPage: number;
}) {
  try {
    const start = performance.now();
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
    const counts = await prisma.products.count();
    let pages = counts / elementsPerPage;
    pages = Math.ceil(pages);
    const end = performance.now();
    return NextResponse.json({ data: products, pages: pages });
  } catch (error) {
    console.log(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
