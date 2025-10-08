import { ListProduct } from "@/models/list_products";
import { ChangeManager } from "../../../../models/change_manager/changeManager.model";
import { Client } from "../../../../models/client/client.model";
import { Payment } from "@/models/payment/payment.model";

export interface Sale {
  id: number;
  list_products: ListProduct;
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
