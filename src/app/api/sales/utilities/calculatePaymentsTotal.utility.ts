import { CreatePaymentOfSale } from "../models";

export function calculateTotalPayments(
  payments: CreatePaymentOfSale[] | undefined
): number {
  if (payments) {
    const priceTotalPayments = payments.reduce(
      (acumulador, item) => acumulador + item.payment_amount,
      0
    );
    return priceTotalPayments;
  }
  return 0;
}
