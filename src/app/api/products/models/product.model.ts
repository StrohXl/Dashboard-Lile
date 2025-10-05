import { CreateProduct } from "../validators/product.validator";

export interface Product extends Required<CreateProduct> {
  id: number;
  createdAT: string;
  updatedAT: string;
}
