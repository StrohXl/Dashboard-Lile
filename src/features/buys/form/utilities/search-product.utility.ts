import { FieldArrayWithId } from "react-hook-form";
import { FormBuy } from "../models";
import { Product } from "@/app/api/products/models";

export const searchProduct = ({
  text,
  fields,
  setOpen,
  setSearch,
  setProducts,
  options,
}: {
  text: string;
  fields: FieldArrayWithId<FormBuy>[];
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setProducts: (value: Product[]) => void;
  options: Product[];
}) => {
  setSearch(text);
  if (text !== "") {
    setOpen(true);
  } else {
    setOpen(false);
    setProducts(options);
  }
  const searchFields = fields.find((item) => item.name.includes(text))
    ? true
    : false;
  setProducts(
    options.filter((item) => item.name.includes(text) && !searchFields)
  );
};
