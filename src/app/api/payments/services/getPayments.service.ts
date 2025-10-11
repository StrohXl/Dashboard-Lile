import { getPages } from "@/utils";
import { Payments } from "@prisma/client";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";


export async function getPayments({
  params,
}: {
  params: ParamsRequest;
}): ResponseService<ResponseGet<Payments>> {
  const { skip, take, pages } = await getPages("/payments", params);

  try {
    const payments = await prisma.payments.findMany({
      skip,
      take,
      orderBy: {
        id: "desc",
      },
      cacheStrategy: {
        ttl: 3,
      },
    });
    return NextResponse.json({
      message: "Pagos",
      status: 200,
      data: { data: payments, pages },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
