import { CreatePayment } from "@/models/api/payment/createPayment.model";
import { Decimal } from "@prisma/client/runtime/library";

export function paymentsAdapter(
  sale: {
    payments: {
      id: number;
      created_at: Date;
      payment_method: string;
      payment_amount: Decimal;
      operation: number;
      sales_id: number | null;
    }[];
    list_products: {
      id: number;
      name: string;
      price: Decimal;
      stock: number;
      createdAT: Date;
      updatedAT: Date;
      buysId: number | null;
      salesId: number | null;
    }[];
  } & {
    id: number;
    total_price: Decimal;
    debt: Decimal;
    status: string;
    id_client: number;
    created_at: Date;
    updated_at: Date;
  }
): CreatePayment[] {
  const payments: CreatePayment[] = sale.payments.map((item) => ({
    payment_method:
      item.payment_method == "efectivo Bs"
        ? "efectivo Bs"
        : item.payment_method == "divisa"
        ? "divisa"
        : "transferencia",
    payment_amount: Number(item.payment_amount),
    sales_id: item.sales_id ?? 1,
  }));
  return payments;
}
