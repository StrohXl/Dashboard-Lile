import { CreateProduct } from "../../products/models";

export interface ListProduct extends CreateProduct {
  selling_price: number;
}
