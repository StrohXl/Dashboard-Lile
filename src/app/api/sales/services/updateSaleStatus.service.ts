import prisma from "@/libs/prisma";
import { calculateTotalPayments, getSaleStatus } from "../utilities";
import { calculateTotalPrice } from "@/utils";
import { getDebt } from "../utilities/getDebt.utility";
import { paymentsAdapter } from "../../payments/adapters/payments.adapter";
import { listProductsAdapter } from "../../payments/adapters/listProducts.adapter";

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
      const listProducts = listProductsAdapter(sale);
      const totalPayments = calculateTotalPayments(payments);
      const totalPrice = calculateTotalPrice(listProducts);
      const status = getSaleStatus({ totalPayments, totalPrice });
      const debt = getDebt({ totalPayments, totalPrice });

      await prisma.sales.update({
        where: { id },
        data: {
          status,
          debt,
        },
      });
    } else {
      return undefined;
    }
  } catch (error) {
    console.error(error);
    
  }
}
