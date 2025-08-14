import { Product } from "@/app/api/products/models";
import { useState } from "react";

export default function SelectProductHook({
  dataProducts,
}: {
  dataProducts: Product[];
}) {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(dataProducts);
  const [open, setOpen] = useState<boolean>(false);

  return {
    search,
    setSearch,
    products,
    setProducts,
    open,
    setOpen,
  };
}
