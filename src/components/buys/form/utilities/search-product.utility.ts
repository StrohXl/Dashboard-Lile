import { FieldArrayWithId } from "react-hook-form";
import { FormBuy } from "../models";
import { Product } from "@/app/api/products/models";

export const searchProduct = ({
  text,
  fields,
  products,
  setOpen,
  setSearch,
  setProducts,
}: {
  text: string;
  fields: FieldArrayWithId<FormBuy>[];
  products: Product[];
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setProducts: (value: Product[]) => void;
}) => {
  setSearch(text);
  if (text !== "") {
    setOpen(true);
  } else {
    setOpen(false);
  }
  const searchFields = fields.find((item) => item.name.includes(text))
    ? true
    : false;
  setProducts(
    products.filter((item) => item.name.includes(text) && !searchFields)
  );
};
