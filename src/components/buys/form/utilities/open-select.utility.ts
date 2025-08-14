import { Product } from "@/app/api/products/models";
import { FormBuy } from "../models";
import { FieldArrayWithId } from "react-hook-form";

export function openSelect({
  open,
  products,
  fields,
  setOpen,
  setProducts,
}: {
  open: boolean;
  products: Product[];
  fields: FieldArrayWithId<FormBuy>[];
  setOpen: (value: boolean) => void;
  setProducts: (value: Product[]) => void;
}) {
  if (open) {
    setOpen(false);
  } else {
    setOpen(true);
    const filterProducts: Product[] = products.filter((item) =>
      fields.find((field) => field.name.includes(item.name)) ? false : true
    );
    setProducts(filterProducts);
  }
}
