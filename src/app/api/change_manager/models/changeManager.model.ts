export interface ChangeManager {
  id: number;
  change_method: "efectivo Bs" | "divisa" | "transferencia";
  change_amount: number;
  operation?: number | undefined;
  sales_id: number;
  created_at: string;
  updated_at: string
}
