import { Product } from "@/app/api/products/models";
import getData from "@/fetch/data/getData";
import { ResponseData } from "@/models";
import { UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

export const searchProduct = ({
  text,
  setOpen,
  setSearch,
  setOptions,
  setLoading,
  getValues,
}: {
  text: string;
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setOptions: (value: Product[]) => void;
  setLoading: (value: boolean) => void;
  getValues: UseFormGetValues<FormSale>;
}) => {
  setSearch(text);
  if (text !== "") {
    setLoading(true);
    setOpen(true);
    clearTimeout(timeout);

    const idFields = getValues("list_products").map((item) => item.id);
    timeout = setTimeout(async () => {
      const products: ResponseData<Product> = await getData({
        url: "/products",
        params: { name: text },
      });
      setOptions(products.data.filter((item) => item.name.includes(text) && !idFields.includes(item.id)));
      setLoading(false);
    }, 300);
  } else {
    setOpen(false);
  }
};
