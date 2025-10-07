import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { updateSaleStatus } from "../../sales/services";

export async function deletePayments({ ids }: { ids: number[] }) {
  const saleIds: number[] = [];

  ids.forEach(async (id) => {
    const payment = await prisma.payments.findUnique({ where: { id } });
    if (payment && !saleIds.includes(id)) {
      saleIds.push(id);
    }
  });

  try {
    await prisma.$transaction(async (tx) => {
      // Obtener el id de cada venta para  despues modificarla
      await tx.payments.deleteMany({ where: { id: { in: ids } } });
    });
    saleIds.forEach(async (id) => {
      await updateSaleStatus({ id, tx: prisma });
    });
    return NextResponse.json("Pagos eliminados");
  } catch (error) {
    console.error(error);
    return NextResponse.json(error, { status: 500 });
  }
}
