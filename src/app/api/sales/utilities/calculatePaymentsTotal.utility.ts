import { CreatePayment } from "@/models/api/payment/createPayment.model";

export function calculateTotalPayments({
  payments,
  dollar,
}: {
  payments: Omit<CreatePayment, "sales_id">[] | undefined;
  dollar: number;
}): number {
  if (payments) {
    const priceTotalPayments = payments.reduce(
      (accumulator, item) =>
        accumulator +
        (item.payment_method == "divisa"
          ? Number(item.payment_amount)
          : Number(item.payment_amount) / dollar),
      0
    );
    return priceTotalPayments;
  }
  return 0;
}
