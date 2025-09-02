import { Product } from "@/app/api/products/models";
import { FormBuy } from "../models";
import { FieldArrayWithId } from "react-hook-form";

export function openSelect({
  open,
  fields,
  setOpen,
  setProducts,
  options
}: {
  open: boolean;
  fields: FieldArrayWithId<FormBuy>[];
  setOpen: (value: boolean) => void;
  options: Product[]
  setProducts: (value: Product[]) => void;
}) {
  if (open) {
    setOpen(false);
  } else {
    setOpen(true);
    const filterProducts: Product[] = options.filter((item) =>
      fields.find((field) => field.name.includes(item.name)) ? false : true
    );
    setProducts(filterProducts);
  }
}
