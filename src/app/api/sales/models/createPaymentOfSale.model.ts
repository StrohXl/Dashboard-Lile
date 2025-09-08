export interface CreatePaymentOfSale {
  id?: number;
  payment_method: "efectivo Bs" | "divisa" | "transferencia";
  payment_amount: number;
  operation?: number | undefined;
}
