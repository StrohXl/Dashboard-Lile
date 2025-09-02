import prisma from "@/libs/prisma";
import { getPages } from "@/utils";
import { NextResponse } from "next/server";

export async function getPayments({
  all,
  page,
}: {
  all: string;
  page: number;
}) {
  const { elementsPerPage, pages } = await getPages("/payments");
  try {
    const payments = await prisma.payments.findMany({
      skip: page == 0 ? page : (page - 1) * elementsPerPage,
      take: all == "false" ? elementsPerPage : undefined,
    });
    return NextResponse.json({ data: payments, pages });
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
