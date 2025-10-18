import { Prisma, Sales } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { UpdateSale } from "@/models/api/sale";
import { ResponseService } from "@/models/response/responseService.model";

import prisma from "../../../../../libs/prisma";
import { updateBodySaleValidator } from "../validators";
import { updateSaleStatus } from "./updateSaleStatus.service";
import { Token } from "@/models/token";

export async function updateSaleById({
  id,
  body,
  token,
}: {
  body: UpdateSale;
  id: number;
  token: Token;
}): ResponseService<Sales> {
  const validBody = updateBodySaleValidator(body);
  if (validBody instanceof ZodError) {
    console.error(validBody);
    return NextResponse.json(
      { message: "Error en el cuerpo de la solicitud", status: 400 },
      {
        status: 400,
      }
    );
  }

  //Payments
  const paymentsConnet = body.payments.filter((item) => item.id != 0);
  const paymentsCreate = body.payments.filter((item) => item.id == 0);
  const changesConnect =
    body.change_manager?.filter((item) => item.id != 0) ?? [];
  const changesCreate =
    body.change_manager?.filter((item) => item.id == 0) ?? [];

  try {
    const sale = await prisma.$transaction(async (tx) => {
      const sale = await tx.sales.update({
        where: {
          id,
        },
        data: {
          payments: {
            create: paymentsCreate.map((item) => ({
              payment_amount: item.payment_amount,
              operation: item.operation,
              payment_method: item.payment_method,
            })),
            connect:
              paymentsConnet.length > 0
                ? paymentsConnet.map((item) => ({
                    id: item.id,
                  }))
                : [],
          },
          change_manager: {
            create: changesCreate.map((item) => ({
              change_amount: item.change_amount,
              change_method: item.change_method,
              operation: item.operation,
            })),
            connect: changesConnect.map((item) => ({
              id: item.id,
            })),
          },
          User: {
            connect: {
              id: token.id,
            },
          },
        },
      });
      await updateSaleStatus({ id, tx });
      return sale;
    });
    return NextResponse.json({
      message: "Venta actualizada",
      data: sale,
      status: 200,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return NextResponse.json(
          { message: "El cliente no existe", status: 404 },
          { status: 404 }
        );
      }
    }
    return NextResponse.json(
      { message: "Error", status: 400 },
      { status: 400 }
    );
  }
}
