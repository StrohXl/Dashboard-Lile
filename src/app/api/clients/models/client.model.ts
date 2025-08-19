import { Sale } from "../../sales/models/sale.model";

export interface Client {
  id: number;
  name: string;
  last_name: string;
  sales: Sale[];
  createAT: string;
  updatedAT: string;
}
