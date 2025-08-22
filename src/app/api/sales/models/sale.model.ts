import { ListProduct } from "../../list-products/models";
import { Payment } from "../../payments/models/payment.model";

export interface Sale {
  id: number;
  list_product: ListProduct[];
  payments: Payment[]
  total_price: number;
  id_Client: number;
  createdAT: string;
  updatedAT: string;
}
