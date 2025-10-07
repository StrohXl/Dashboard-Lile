import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { Products } from "@prisma/client";

export async function getProducts({
  params,
}: {
  params: ParamsRequest;
}): ResponseService<ResponseGet<Products>> {
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
    return NextResponse.json({
      data: { data: products, pages },
      message: "Productos encontrados",
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
