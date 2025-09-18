import { ParamsRequest } from "@/models";
import prisma from "../../../../../libs/prisma";
import { NextResponse } from "next/server";
import { getPages } from "@/utils";

export async function getHistoryPrice({ params }: { params: ParamsRequest }) {
  try {
    const { pages, skip, take } = await getPages("/history_price", params);
    const data = await prisma.historyPrice.findMany({
      skip,
      take,
      orderBy:{
        id: 'desc'
      }
    });
    return NextResponse.json({ data, pages });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
