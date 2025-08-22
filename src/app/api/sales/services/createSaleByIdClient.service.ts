import prisma from "@/libs/prisma";
import { CreateSale } from "../validators/bodySale.validator";
import { calculateTotalPayments, getSaleStatus } from "../utilities";
import { calculateTotalPrice } from "@/utils";
import { getDebt } from "../utilities/getDebt.utility";
import { createListProduct } from "../../list-products/adapters";

export async function createSaleByIdClient(body: CreateSale) {
  const totalPayments = calculateTotalPayments(body.payments);
  const totalPrice = calculateTotalPrice(body.list_products);
  const status = getSaleStatus({ totalPayments, totalPrice });
  const debt = getDebt({ totalPayments, totalPrice });
  const listProducts = createListProduct(body.list_products);
  const sale = await prisma.sales.create({
    data: {
      status,
      debt,
      total_price: totalPrice,
      list_products: {
        create: listProducts,
      },
      id_client: body.id_client ?? 0,
      payments: {
        create: body.payments,
      },
      products: {
        connect: body.list_products.map((item) => ({ id: item.id })),
      },
    },
  });
  return sale;
}
