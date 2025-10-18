import { getPages } from "@/utils";
import { Payments } from "@prisma/client";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { Token } from "@/models/token";

export async function getPayments({
  params,
  token,
}: {
  params: ParamsRequest;
  token: Token;
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
      where: {
        userId: token.id,
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
