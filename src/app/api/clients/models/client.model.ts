import { Sale } from "../../sales/models/sale.model";

export interface Client {
  id: number;
  name: string;
  last_name: string;
  ci: number;
  sales: Sale[];
  create_at: string;
  updated_at: string;
}
