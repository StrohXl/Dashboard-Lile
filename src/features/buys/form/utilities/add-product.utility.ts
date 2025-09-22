import { Product } from "@/app/api/products/models";
import { FormBuy } from "../models";
import { UseFieldArrayPrepend } from "react-hook-form";

export function addProduct({
  product,
  setOpen,
  setSearch,
  prepend,
}: {
  product: Product;
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  prepend: UseFieldArrayPrepend<FormBuy>;
}) {

  setOpen(false);
  setSearch("");
  prepend({
    id: product.id,
    buyType: product.unit,
    markup: 0.2,
    moneyType: "dollar",
    name: product.name,
    price: product.price,
    sellingPrice: 0,
    stock: 1,
  });
  
}
