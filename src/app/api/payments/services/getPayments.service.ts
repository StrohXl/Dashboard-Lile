import prisma from "@/libs/prisma";
import { getPages } from "@/utils";
import { NextResponse } from "next/server";

export async function getPayments() {
  const { elementsPerPage, pages } = await getPages("payments");
  try {
    const payments = await prisma.payments.findMany({
      take: elementsPerPage,
      skip: pages,
    });
    return NextResponse.json(payments);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
