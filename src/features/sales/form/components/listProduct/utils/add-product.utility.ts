import { Product } from "@/app/api/products/models";

export function addProduct({
  id,
  options,
  setOpen,
  setOptions,
  setSearch,
  changeSelect,
}: {
  id: number;
  options: Product[];
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setOptions: (value: Product[]) => void;
  changeSelect: (value: number) => void;
}) {
  setOpen(false);
  changeSelect(id);
  setSearch("");
  setOptions(options);
}
