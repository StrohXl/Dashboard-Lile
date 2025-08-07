import getData from "@/fetchs/data/getData";
import { useEffect, useState } from "react";

export function HookFormBuy() {
  // States
  const [products, setProducts] = useState({ data: [], pages: 0 });

  // Functions
  const getProducts = async () => {
    const data = await getData({ url: "/products" });
    setProducts(data);
  };

  // Effect
  useEffect(() => {
    getProducts();
  }, []);
}
