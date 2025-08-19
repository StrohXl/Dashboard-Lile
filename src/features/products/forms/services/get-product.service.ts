import { UseFormReset } from "react-hook-form";
import { Product } from "@/app/api/products/models";
import getProductId from "@/fetch/products/getProductId";
import { FormProduct } from "../models/form-product.model";

export const getProduct = async ({
  id,
  reset,
  setProduct,
  setLoading,
  dollar,
}: {
  id: number;
  dollar: number | undefined;
  reset: UseFormReset<FormProduct>;
  setProduct: (value: Product | undefined) => void;
  setLoading: (value: boolean) => void;
}) => {
  const data = await getProductId(id);
  if (data) {
    reset({
      name: data.name,
      price: data.price,
      stock: data.stock,
      priceBs: dollar && data.price * dollar,
    });
    setProduct(data);
  }
  setLoading(false);
};
