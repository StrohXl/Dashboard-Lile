import { getPages } from "@/utils";
import { NextResponse } from "next/server";

import { ParamsRequest } from "@/models";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { ChangeManager } from "@prisma/client";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export async function getChanges({
  params,
}: {
  params: ParamsRequest;
}): ResponseService<ResponseGet<ChangeManager>> {
  const { take, pages, skip } = await getPages("/change_manager", params);
  try {
    const changes = await prisma.changeManager.findMany({
      take,
      skip: skip,
      orderBy: {
        id: "desc",
      },
      cacheStrategy: {
        ttl: 3,
      },
    });
    return NextResponse.json({
      message: "Cambios",
      data: { data: changes, pages },
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `${error}`, status: 500 },
      { status: 500 }
    );
  }
}
