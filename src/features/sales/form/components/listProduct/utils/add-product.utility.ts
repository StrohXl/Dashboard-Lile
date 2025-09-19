import { Product } from "@/app/api/products/models";
import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "../../../models";

export function addProduct({
  product,
  setOpen,
  setSearch,
  prependProduct,
}: {
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  product: Product;
  prependProduct: UseFieldArrayPrepend<FormSale, "list_products">;
}) {
  setOpen(false);
  setSearch("");
  prependProduct({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: 1,
    unit: product.unit,
  });
}
