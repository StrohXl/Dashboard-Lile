import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export async function deleteBuys(ids: number[]) {
  try {
    await prisma.buys.deleteMany({ where: { id: { in: ids } } });
    return NextResponse.json("Compras Eliminadas");
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}