import { ProductsBuy } from "@/app/api/buys/validators/createBuy.validator";

interface Products extends Omit<ProductsBuy, "iva"> {
  type_of_currency_of_the_purchase: "dollar" | "bs";
  type_of_currency_for_sale: "dollar" | "bs";
  iva: "true" | "false";
}

export interface FormBuy {
  products: Products[];
  selling_price: number;
  markup: number;
  method: "unit" | "package" | "kg";
}
