import { CreatePaymentOfSale } from "../models";

export function calculateTotalChanges(
  payments: CreatePaymentOfSale[] | undefined
): number {
  if (payments) {
    const priceTotalChanges = payments.reduce(
      (acumulador, item) => acumulador + item.payment_amount,
      0
    );
    return priceTotalChanges;
  }
  return 0;
}
