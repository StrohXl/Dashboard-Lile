import { getPages } from "@/utils";
import { Prisma, Sales } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export async function getSales({
  params,
}: {
  params: ParamsRequest;
}): ResponseService<ResponseGet<Sales>> {
  const { skip, take, pages } = await getPages("/sales", params);
  try {
    const sales = await prisma.sales.findMany({
      include: {
        list_products: true,
        client: true,
      },
      skip: skip,
      take: take,
      orderBy: {
        id: "desc",
      },
    });
    return NextResponse.json({
      message: "Ventas",
      status: 200,
      data: { data: sales, pages },
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: error.message, status: 400 },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { status: 500, message: "Error" },
      { status: 500 }
    );
  }
}
