import { Product } from "./product.model";

export interface FormProduct extends Omit<Product, "iva"> {
  iva: "true" | "false";
  type_of_currency: "bs" | "dollar";
}
