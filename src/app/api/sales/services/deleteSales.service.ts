import prisma from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function deleteSales(ids: number[]) {
  try {
    await prisma.sales.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return NextResponse.json("Ventas eliminadas");
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
