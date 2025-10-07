import { CreateProduct } from "../validators/product.validator";

export interface Product extends Required<CreateProduct> {
  id: number;
  createdAT: Date;
  updatedAT: Date;
  userId: number | null;
  salesId: number | null;
}
