import { Product } from "@/app/api/products/models";
import { useState } from "react";

export default function SelectProductHook() {
  
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);

  return {
    search,
    setSearch,
    products,
    setProducts,
    open,
    setOpen,
    loading,
    setLoading,
  };
}
