import { Product } from "@/app/api/products/models";

interface Products extends Product {
  type: "create" | "select";
  sellingPrice: number;
  buyType: "individual" | "group";
  moneyType: "dollar" | "bs";
  markup: number;
}

export interface FormBuy {
  products: Products[];
}
