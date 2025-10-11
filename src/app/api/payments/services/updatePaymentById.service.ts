import { Payments, Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { CreatePayment } from "@/models/api/payment/createPayment.model";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { updateSaleStatus } from "../../sales/services";
import { createPaymentValidator } from "../validators/createPayment.validator";

export async function updatePaymentById({
  id,
  body,
}: {
  id: number;
  body: CreatePayment;
}): ResponseService<Payments> {
  const bodyValidator = createPaymentValidator(body);
  if (bodyValidator instanceof ZodError) {
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud", status: 400 },
      {
        status: 400,
      }
    );
  }

  try {
    await prisma.$transaction(async (tx) => {
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
    return NextResponse.json({ message: "Pagos actualizados", status: 200 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        { message: `${error}`, status: 400 },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { message: `${error}`, status: 400 },
      { status: 500 }
    );
  }
}
