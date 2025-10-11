import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { ResponseService } from "@/models/response/responseService.model";
import { Payments } from "@prisma/client";

export async function getPaymentById(id: number): ResponseService<Payments> {
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
      return NextResponse.json(
        { message: "Pago no encontrado", status: 404 },
        { status: 404 }
      );
    }
    return NextResponse.json({
      data: payment,
      message: "Pago encontrado",
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
