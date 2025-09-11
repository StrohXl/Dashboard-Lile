import prisma from "@/libs/prisma";
import { ParamsRequest } from "@/models";
import { getPages } from "@/utils";
import { NextResponse } from "next/server";

export async function getPayments({ params }: { params: ParamsRequest }) {
  
  const { skip, take, pages } = await getPages("/payments", params);

  try {
    const payments = await prisma.payments.findMany({
      skip,
      take,
    });
    return NextResponse.json({ data: payments, pages });

  } catch (error) {

    console.error(error);
    return NextResponse.json("Error", { status: 500 });

  }
}
