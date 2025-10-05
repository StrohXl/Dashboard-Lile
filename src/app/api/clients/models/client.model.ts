import { Sale } from "../../sales/models/sale.model";
import { CreateClient } from "../validators";

export interface Client extends CreateClient {
  id: number;
  sales?: Sale[];
  create_at: string;
  updated_at: string;
}
