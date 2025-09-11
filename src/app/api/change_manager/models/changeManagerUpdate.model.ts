export interface ChangeManagerUpdate {
  id?: number;
  change_method: "efectivo Bs" | "divisa" | "transferencia" | string;
  change_amount: number;
  operation?: number | undefined;
}
