import { Product } from "@/app/api/products/models";

export interface FormProduct extends Omit<Product, "iva"> {
  iva: "true" | "false";
  type_of_currency: "bs" | "dollar";
}
