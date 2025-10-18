import { getPages } from "@/utils/getPages.utility";
import { Products } from "@prisma/client";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseService } from "@/models/response/responseService.model";
import { Token } from "@/models/token";

import prisma from "../../../../../libs/prisma";

export async function getProducts({
  params,
  token,
}: {
  params: ParamsRequest;
  token: Token;
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
        userId: token.id,
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
