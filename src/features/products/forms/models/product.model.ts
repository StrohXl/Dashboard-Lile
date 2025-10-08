import { CreateProduct } from "@/models/api/product";

export interface Product extends CreateProduct {
  id: number;
}