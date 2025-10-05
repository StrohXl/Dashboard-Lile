import { CreateListProduct } from "../validators/createListProduct.validator";

export interface ListProduct extends CreateListProduct {
  createdAt: string;
  updatedAt: string;
}
