import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function deleteBuys(ids: number[]) {
  try {
    await prisma.buys.deleteMany({ where: { id: { in: ids } } });
    return NextResponse.json("Compras Eliminadas");
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, { status: 500 });
  }
}