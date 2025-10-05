import { UseFieldArrayPrepend } from "react-hook-form";
import { FormBuy } from "../../../models";
import { OptionsProduct } from "../services/getProducts.service";

export function addProduct({
  product,
  setOpen,
  setTextSearch,
  prepend,
}: {
  product: OptionsProduct;
  setOpen: (value: boolean) => void;
  setTextSearch: (value: string) => void;
  prepend: UseFieldArrayPrepend<FormBuy>;
}) {
  setOpen(false);
  setTextSearch("");
  prepend({
    id: product.id,
    unit: product.unit,
    name: product.name,
    selling_price: 0.1,
    stock: 1,
    iva: product.iva == true ? "true" : "false",
    purchase_price: 0,
    type_of_currency_for_sale: "dollar",
    type_of_currency_of_the_purchase: "bs",
  });
}
