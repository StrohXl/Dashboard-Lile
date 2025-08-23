import { NextResponse } from "next/server";
import { updateBodySaleValidator, UpdateSale } from "../validators";
import { ZodError } from "zod";
import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { updateSaleStatus } from "./updateSaleStatus.service";

export async function updateSaleById({
  id,
  body,
}: {
  body: UpdateSale;
  id: number;
}) {
  const validBody = updateBodySaleValidator(body);
  if (validBody instanceof ZodError) {
    return NextResponse.json("Error en el cuerpo de la solicitud", {
      status: 400,
    });
  }
  const paymentsConnet = body.payments?.filter((item) => item.id);
  try {
    await prisma.sales.update({
      where: {
        id,
      },
      data: {
        id_client: body.id_client,
        payments: {
          create: body.payments?.filter((item) => !item.id),
          connect: paymentsConnet?.map((item) => ({
            id: item.id,
            payment_amount: item.payment_amount,
            payment_method: item.payment_method,
            operation: item.operation,
          })),
        },
      },
    });
    const saleUpdate = await updateSaleStatus(id);
    return NextResponse.json(saleUpdate);
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2003") {
        return NextResponse.json("El cliente no existe", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 400 });
  }
}
