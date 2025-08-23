import prisma from "@/libs/prisma";
import { calculateTotalPayments, getSaleStatus } from "../utilities";
import { getDebt } from "../utilities/getDebt.utility";
import { paymentsAdapter } from "../../payments/adapters/payments.adapter";

export async function updateSaleStatus(id: number) {
  try {
    const sale = await prisma.sales.findUnique({
      where: { id },
      include: {
        payments: true,
        list_products: true,
      },
    });
    if (sale) {
      const payments = paymentsAdapter(sale);
      const totalPayments = calculateTotalPayments(payments);
      const totalPrice = Number(sale.total_price)
      const status = getSaleStatus({ totalPayments, totalPrice });
      const debt = getDebt({ totalPayments, totalPrice });
      console.log({totalPayments,totalPrice,status,debt})
      const saleUpdate = await prisma.sales.update({
        where: { id },
        data: {
          status,
          debt,
        },
      });
      return saleUpdate
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
    
  }
}
