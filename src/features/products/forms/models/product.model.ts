import { CreateProduct } from "@/models/product";

export interface Product extends CreateProduct {
  id: number;
}