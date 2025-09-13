import { Product } from "@/app/api/products/models";
import { ListProduct } from "@/app/api/list-products/models";
import getData from "@/fetch/data/getData";
import { ResponseData } from "@/models";

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

export const searchProduct = ({
  text,
  fields,
  setOpen,
  setSearch,
  setOptions,
  setLoading,
  setProducts,
}: {
  text: string;
  fields: ListProduct[];
  setOpen: (value: boolean) => void;
  setSearch: (value: string) => void;
  setOptions: (value: Product[]) => void;
  setProducts: (value: Product[]) => void;
  setLoading: (value: boolean) => void;
}) => {
  setSearch(text);
  if (text !== "") {
    setLoading(true);
    setOpen(true);
    clearTimeout(timeout);
    timeout = setTimeout(async () => {
      const searchFields = fields.find((item) => item.name.includes(text))
        ? true
        : false;

      const products: ResponseData<Product> = await getData({
        url: "/products",
        params: { name: text },
      });
      setOptions(
        products.data.filter(
          (item) => item.name.includes(text) && !searchFields
        )
      );
      setProducts(products.data);
      setLoading(false);
    }, 300);
  } else {
    setOpen(false);
  }
};
