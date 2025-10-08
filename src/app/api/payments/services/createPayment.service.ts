import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import prisma from "../../../../../libs/prisma";
import { updateSaleStatus } from "../../sales/services";
import { createPaymentValidator } from "../validators/createPayment.validator";
import { CreatePayment } from "@/models/api/payment/createPayment.model";

export async function createPayment(body: CreatePayment) {
  const bodyValidator = createPaymentValidator(body);
  if (bodyValidator instanceof ZodError) {
    return NextResponse.json("Error en el cuerpo de la solicitud", {
      status: 400,
    });
  }
  if (body.payment_method === "transferencia" && !body.operation) {
    return NextResponse.json("Se necesita el numero de operacion");
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
        return NextResponse.json("Cliente no encontrado", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
