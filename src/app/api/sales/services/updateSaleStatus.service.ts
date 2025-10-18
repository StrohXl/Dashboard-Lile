import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { paymentsAdapter } from "../../payments/adapters/payments.adapter";
import { calculateTotalPayments } from "../utilities";
import { getDebt } from "../utilities/getDebt.utility";
import { calculateTotalChanges } from "../utilities/calculateTotalChanges.utility";

type PrismaTransaction = Parameters<
  Parameters<typeof prisma.$transaction>[0]
>[0];

export async function updateSaleStatus({
  id,
  tx,
}: {
  id: number;
  tx: PrismaTransaction;
}) {
  try {
    const dollar = (await getPyDollar()) ?? 0;

    const sale = await tx.sales.findUnique({
      where: { id },
      include: {
        payments: true,
        list_products: true,
        change_manager: true,
      },
    });

    if (!sale) {
      throw new Error("Venta no encontrada");
    }

    const payments = paymentsAdapter(
      sale.payments.map((item) => ({
        id: item.id,
        created_at: `${item.created_at}`,
        payment_amount: Number(item.payment_amount),
        payment_method: item.payment_method,
        sales_id: item.id,
      }))
    );

    const changes = sale.change_manager.map((item) => ({
      change_method: item.change_method,
      change_amount: Number(item.change_amount),
      operation: item.operation,
    }));

    const totalChanges = Number(
      calculateTotalChanges({ changes, dollar }).toFixed(2)
    );
    const totalPayments = Number(
      calculateTotalPayments({ dollar, payments }).toFixed(2)
    );

    const totalPrice = Number(sale.total_price);
    const match = Number(Math.abs(totalChanges - totalPayments).toFixed(2));

    const status = match - totalPrice == 0 ? "completed" : "pending";

    const debt = getDebt({ totalPayments, totalPrice });

    const saleUpdate = await tx.sales.update({
      where: { id },
      data: {
        status,
        debt,
      },
    });

    return saleUpdate;
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(error);
    }
    return NextResponse.json(error);
  }
}
