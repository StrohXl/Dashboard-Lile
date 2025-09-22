export interface CreatePaymentOfSale {
  id?: number;
  payment_method: "efectivo Bs" | "divisa" | "transferencia" | "biopago"| string;
  payment_amount: number;
  operation?: number | undefined;
}
