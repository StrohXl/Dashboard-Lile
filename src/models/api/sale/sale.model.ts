import { ListProduct } from "@/models/api/list_products";
import { Payment } from "@/models/api/payment/payment.model";
import { ChangeManager } from "../change_manager";
import { Client } from "../client";

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
