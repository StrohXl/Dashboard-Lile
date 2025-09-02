import prisma from "@/libs/prisma";
import { calculateTotalPayments, getSaleStatus } from "../utilities";
import { getDebt } from "../utilities/getDebt.utility";
import { paymentsAdapter } from "../../payments/adapters/payments.adapter";

export async function updateSaleStatus(id: number) {
  try {
    await prisma.$transaction(async (tx) => {
      const sale = await tx.sales.findUnique({
        where: { id },
        include: {
          payments: true,
          list_products: true,
        },
      });
      if (!sale) {
        throw new Error("Venta no encontrada");
      }
      const payments = paymentsAdapter(sale);
      const totalPayments = calculateTotalPayments(payments);
      const totalPrice = Number(sale.total_price);
      const status = getSaleStatus({ totalPayments, totalPrice });
      const debt = getDebt({ totalPayments, totalPrice });
      const saleUpdate = await prisma.sales.update({
        where: { id },
        data: {
          status,
          debt,
        },
      });
      return saleUpdate;
    });
  } catch (error) {
    console.error(error);
  }
}
