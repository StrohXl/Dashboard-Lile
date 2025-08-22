import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

export async function deletePaymentById(id: number) {
  try {
    await prisma.payments.delete({
      where: {
        id,
      },
    });
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
