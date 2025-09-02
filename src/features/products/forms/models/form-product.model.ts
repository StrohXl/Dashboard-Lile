import { CreateProduct } from "@/app/api/products/validators/product.validator";

export interface FormProduct extends CreateProduct {
  priceBs: number;
}
