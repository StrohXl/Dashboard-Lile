import { Product } from "@/app/api/products/models";
import { UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";
import axios from "axios";

let timeout: ReturnType<typeof setTimeout> = setTimeout(() => {});

export const searchProductById = ({
  id,
  setOpen,
  setOptions,
  setLoading,
  getValues,
}: {
  id: string;
  setOpen: (value: boolean) => void;
  setOptions: (value: Product[]) => void;
  setLoading: (value: boolean) => void;
  getValues: UseFormGetValues<FormSale>;
}) => {
  if (id) {
    setLoading(true);
    setOpen(true);
    clearTimeout(timeout);

    const idFields = getValues("list_products").map((item) => item.id);
    timeout = setTimeout(async () => {
      try {
        const { data }: { data: Product } = await axios.get(
          `/api/products/${id}`
        );
        const listProducts = [data];
        setOptions(listProducts.filter((item) => !idFields.includes(item.id)));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        setOptions([])
      }
    }, 300);
  } else {
    setOpen(false);
  }
};
