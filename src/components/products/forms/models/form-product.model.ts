import { CreateProduct } from "@/app/api/products/models";

export interface FormProduct extends CreateProduct {
  priceBs: number;
}
