import { Payments, Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreatePayment } from "@/models/api/payment/createPayment.model";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { updateSaleStatus } from "../../sales/services";
import { createPaymentValidator } from "../validators/createPayment.validator";

export async function createPayment(
  body: CreatePayment
): ResponseService<Payments> {
  const bodyValidator = createPaymentValidator(body);
  if (bodyValidator instanceof ZodError) {
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud", status: 400 },
      {
        status: 400,
      }
    );
  }
  if (body.payment_method === "transferencia" && !body.operation) {
    return NextResponse.json(
      {
        message: "Se necesita el numero de operacion",
        status: 400,
      },
      { status: 400 }
    );
  }
  try {
    await prisma.$transaction(async (tx) => {
      const payment = await tx.payments.create({
        data: body,
      });
      await updateSaleStatus({ id: body.sales_id, tx });
      return NextResponse.json(payment);
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return NextResponse.json(
          { message: "Cliente no encontrado", status: 404 },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { message: "Error", status: 500 },
      { status: 500 }
    );
  }
}
