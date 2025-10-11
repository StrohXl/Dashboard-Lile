import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { Prisma } from "@prisma/client/edge";
import { NextResponse } from "next/server";

import prisma from "../../../../../libs/prisma";
import { paymentsAdapter } from "../../payments/adapters/payments.adapter";
import { calculateTotalPayments, getSaleStatus } from "../utilities";
import { getDebt } from "../utilities/getDebt.utility";

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
    const totalPayments = calculateTotalPayments({ dollar, payments });
    const totalPrice = Number(sale.total_price);
    const status = getSaleStatus({ totalPayments, totalPrice });
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
