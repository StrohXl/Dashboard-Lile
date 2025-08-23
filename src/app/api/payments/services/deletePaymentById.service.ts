import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";
import { updateSaleStatus } from "../../sales/services";

export async function deletePaymentById(id: number) {
  try {
    const payment = await prisma.payments.findUnique({
      where: {
        id,
      },
    });
    const idSale = payment?.sales_id ?? 0;
    await prisma.payments.delete({
      where: {
        id,
      },
    });
    await updateSaleStatus(idSale);
    return NextResponse.json("Pago eliminado");
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json("Pago no encontrado", { status: 404 });
      }
    }
    return NextResponse.json("Error", { status: 500 });
  }
}
