import {
  getProducts,
  OptionProducts,
} from "@/components/dashboard/searchMenu/services/getProducts.service";

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

export function searchProduct({
  text,
  setLoading,
  setOptions,
  setTextSearch,
  setOpen,
  idFields = [],
  params,
}: {
  text: string;
  setLoading: (value: boolean) => void;
  setOptions: (value: OptionProducts[]) => void;
  setTextSearch: (value: string) => void;
  setOpen: (value: boolean) => void;
  idFields?: number[];
  params: "id" | "name";
}) {
  setOpen(true);
  setTextSearch(text);
  clearTimeout(timeout);
  console.log(text);

  if (text == "") {
    setOpen(false);
    setOptions([]);
  } else {
    setLoading(true);
    timeout = setTimeout(async () => {
      const products = await getProducts({
        params: params == "name" ? { name: text } : { id: text },
      });
      setLoading(false);
      setOptions(products.filter((item) => !idFields.includes(item.id)));
    }, 300);
  }
}
