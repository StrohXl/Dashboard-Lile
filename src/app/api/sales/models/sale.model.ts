import { ListProduct } from "../../list-products/models";

export interface Sale {
  id: number;
  list_product: ListProduct[];
  total_price: number;
  id_Client: number;
  createdAT: string;
  updatedAT: string;
}
