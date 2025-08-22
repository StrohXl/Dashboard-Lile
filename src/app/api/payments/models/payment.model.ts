export interface Payment {
  id: number;
  payment_method: "efectivo Bs" | "divisa" | "transferencia";
  payment_amount: number;
  operation?: number | undefined;
  sales_id: number;
  create_at: string;
}
