import { Product } from "@/app/api/products/models";
import { ListProduct } from "@/app/api/list-products/models";

export const searchProduct = ({
  text,
  fields,
  setOpen,
  setSearch,
  setOptions,
  products,
}: {
  text: string;
  fields: ListProduct[];
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setOptions: (value: Product[]) => void;
  products: Product[];
}) => {
  setSearch(text);
  if (text !== "") {
    setOpen(true);
  } else {
    setOpen(false);
    setOptions(products);
  }
  const searchFields = fields.find((item) => item.name.includes(text))
    ? true
    : false;
  setOptions(
    products.filter((item) => item.name.includes(text) && !searchFields)
  );
};
