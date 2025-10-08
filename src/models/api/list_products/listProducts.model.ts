import { CreateListProduct } from "./createListProducts.model";

export interface ListProduct extends CreateListProduct {
  createdAt: string;
  updatedAt: string;
}
