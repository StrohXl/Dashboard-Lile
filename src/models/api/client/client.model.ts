import { Sale } from "../sale";
import { CreateClient } from "./createClient.model";

export interface Client extends CreateClient {
  id: number;
  sales?: Sale[];
  create_at: string;
  updated_at: string;
}
