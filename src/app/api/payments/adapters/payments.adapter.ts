import { CreatePayment } from "@/models/api/payment/createPayment.model";
import { Payment } from "@/models/api/payment/payment.model";

export function paymentsAdapter(payments: Payment[]): CreatePayment[] {
  const paymentss: CreatePayment[] = payments.map((item) => ({
    payment_method:
      item.payment_method == "efectivoBs"
        ? "efectivoBs"
        : item.payment_method == "divisa"
          ? "divisa"
          : "transferencia",
    payment_amount: Number(item.payment_amount),
    sales_id: item.sales_id ?? 1,
  }));
  return paymentss;
}
