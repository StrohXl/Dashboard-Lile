import { ChangeManager } from "../../change_manager/models/changeManager.model";
import { Client } from "../../clients/models/client.model";
import { ListProduct } from "../../list-products/models";
import { Payment } from "../../payments/models/payment.model";

export interface Sale {
  id: number;
  list_products: ListProduct[];
  payments: Payment[];
  change_manager: ChangeManager[];
  total_price: number;
  status: "completed" | "pending";
  debt: number;
  id_client: number;
  client: Client;
  created_at: string;
  updated_at: string;
}
