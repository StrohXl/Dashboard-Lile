import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";

export async function getPaymentById(id: number) {
  try {
    const payment = await prisma.payments.findUnique({
      where: {
        id,
      },
      include: {
        sales: true,
      },
    });
    if (!payment) {
      return NextResponse.json("Pago no encontrado", { status: 404 });
    }
    return NextResponse.json(payment);
  } catch (error) {
    console.error(error);
    return NextResponse.json("Error", { status: 500 });
  }
}
