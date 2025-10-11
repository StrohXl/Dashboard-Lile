import { getPages } from "@/utils/getPages.utility";
import { Clients } from "@prisma/client";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";


export const getClients = async ({
  params,
}: {
  params: ParamsRequest;
}): ResponseService<ResponseGet<Clients>> => {
  const { ci, name } = params;

  if (ci) {
    const clients = await prisma.clients.findMany({
      where: {
        ci: {
          equals: Number(ci),
        },
      },
    });
    return NextResponse.json({
      message: "Clientes encontrados",
      data: { data: clients, pages: 0 },
      status: 200,
    });
  }

  const { skip, take, pages } = await getPages("/clients", params);

  const clients = await prisma.clients.findMany({
    where: {
      name: {
        contains: name,
      },
    },
    skip,
    take,
    orderBy: {
      id: "desc",
    },
  });
  return NextResponse.json({
    message: "Clientes econtrados",
    status: 200,
    data: { data: clients, pages },
  });
};
