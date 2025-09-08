import { CreatePaymentOfSale } from "../models";

export function calculateTotalPayments({
  payments,
  dollar,
}: {
  payments: CreatePaymentOfSale[] | undefined;
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
