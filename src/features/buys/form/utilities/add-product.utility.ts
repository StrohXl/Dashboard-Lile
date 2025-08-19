import { Product } from "@/app/api/products/models";

export function addProduct({
  id,
  products,
  setOpen,
  setProducts,
  setSearch,
  changeSelect,
}: {
  id: number;
  products: Product[];
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setProducts: (value: Product[]) => void;
  changeSelect: (value: number) => void;
}) {
  setOpen(false);
  changeSelect(id);
  setSearch("");
  setProducts(products);
}
