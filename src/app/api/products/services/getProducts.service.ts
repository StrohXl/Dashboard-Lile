import prisma from "../../../../../libs/prisma";
import { ParamsRequest } from "@/models";
import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

export async function getProducts({ params }: { params: ParamsRequest }) {
  const { name } = params;
  const { skip, take, pages } = await getPages("/products", params);

  try {
    const products = await prisma.products.findMany({
      orderBy: { id: "desc" },
      skip,
      take,
      where: {
        name: {
          contains: name,
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
