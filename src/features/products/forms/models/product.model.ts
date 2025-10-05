import { CreateProduct } from "@/app/api/products/validators/product.validator";

export interface Product extends CreateProduct {
  id: number;
}