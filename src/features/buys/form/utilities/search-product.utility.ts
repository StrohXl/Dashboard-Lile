import { Product } from "@/app/api/products/models";
import { UseFormGetValues } from "react-hook-form";
import { FormBuy } from "../models";
import getData from "@/fetch/data/getData";

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

export const searchProduct = ({
  text,
  setOpen,
  setSearch,
  setProducts,
  getValues,
  setLoading,
}: {
  text: string;
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setProducts: (value: Product[]) => void;
  setLoading: (value: boolean) => void;
  getValues: UseFormGetValues<FormBuy>;
}) => {
  if (text !== "") {
    setOpen(true);
    setLoading(true);
    setSearch(text);
  } else {
    return setOpen(false);
  }
  clearTimeout(timeout);
  timeout = setTimeout(async () => {
    const idFields = getValues("products").map((item) => item.id);
    const { data }: { data: Product[] } = await getData({
      url: "/products",
      params: {
        name: text,
      },
    });
    const products = data;
    setLoading(false);
    setProducts(products.filter((item) => !idFields.includes(item.id)));
  }, 300);
};
