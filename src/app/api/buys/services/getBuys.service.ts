import { getPages } from "@/utils/getPages.utility";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { Buys } from "@prisma/client";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export async function getBuys({
  params,
}: {
  params: ParamsRequest;
}): ResponseService<ResponseGet<Buys>> {
  const { skip, take, pages } = await getPages("/buys", params);

  try {
    const buys = await prisma.buys.findMany({
      include: {
        list_products: true,
        products: true,
        User: true,
      },
      skip,
      take,
      orderBy: { id: "desc" },
      cacheStrategy: { ttl: 2, tags: ["findBuys"] },
    });
    return NextResponse.json({
      message: "Compras encontradas",
      status: 200,
      data: { data: buys, pages },
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
