import { ZodError } from "zod";
import {
  CreatePayment,
  createPaymentValidator,
} from "../validators/createPayment.validator";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client/edge";
import prisma from "@/libs/prisma";
import { updateSaleStatus } from "../../sales/services";

export function updatePaymentById({
  id,
  body,
}: {
  id: number;
  body: CreatePayment;
}) {
  const bodyValidator = createPaymentValidator(body);
  if (bodyValidator instanceof ZodError) {
    return NextResponse.json("Error en el cuerpo de la solicitud", {
      status: 400,
    });
  }

  try {
    prisma.$transaction(async (tx) => {
      // Update payment
      await tx.payments.update({
        where: {
          id,
        },
        data: {
          payment_amount: body.payment_amount,
          operation: body.operation,
          payment_method: body.payment_method,
          sales_id: body.sales_id,
        },
      });

      await updateSaleStatus({ id: body.sales_id, tx });
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error, { status: 400 });
    }
    return NextResponse.json(error, { status: 500 });
  }
}
