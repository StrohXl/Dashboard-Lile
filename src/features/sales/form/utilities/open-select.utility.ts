import { Product } from "@/app/api/products/models";
import { ListProduct } from "@/app/api/list-products/models";

export function openSelect({
  open,
  fields,
  setOpen,
  setOptions,
  products,
}: {
  open: boolean;
  fields: ListProduct[];
  setOpen: (value: boolean) => void;
  products: Product[];
  setOptions: (value: Product[]) => void;
}) {
  if (open) {
    setOpen(false);
  } else {
    setOpen(true);
    const filterProducts: Product[] = products.filter((item) =>
      fields.find((field) => field.name.includes(item.name)) ? false : true
    );
    setOptions(filterProducts);
  }
}
