import prisma from "@/libs/prisma";
import { ParamsRequest } from "@/models";
import { getPages } from "@/utils";
import { NextResponse } from "next/server";

export async function getChanges({ params }: { params: ParamsRequest }) {
  const { take, pages, skip } = await getPages("/change_manager", params);
  try {
    const changes = await prisma.changeManager.findMany({
      take,
      skip: skip,
    });
    return NextResponse.json({ data: changes, pages });
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
