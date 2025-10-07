import { Product } from "@/models/product";

export interface Buy  {
  id: number;
  products: Product[];
  list_products: Product[];
  total_price: number;
  createdAT: string;
  updatedAT: string;
  userId: number;
}
