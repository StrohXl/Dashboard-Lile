import { CreateBuyProduct } from "@/models/api/buy";

interface Products extends Omit<CreateBuyProduct, "iva"> {
  type_of_currency_of_the_purchase: "dollar" | "bs";
  type_of_currency_for_sale: "dollar" | "bs";
  iva: "true" | "false";
}

export interface FormBuy {
  products: Products[];
  selling_price: number;
  markup: number;
  method: "unit" | "package" | "kg";
  purchase_price: number;
}
