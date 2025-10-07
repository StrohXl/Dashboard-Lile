
import { Product } from "@/app/api/products/models";
import getProductId from "@/fetch/products/getProductId";
import { UseFormReset } from "react-hook-form";

import { FormProduct } from "../models/form-product.model";

export const getProduct = async ({
  id,
  reset,
  setProduct,
  setLoading,
  iva,
}: {
  id: number;
  reset: UseFormReset<FormProduct>;
  setProduct: (value: Product | undefined) => void;
  setLoading: (value: boolean) => void;
  iva: number;
}) => {
  const data = await getProductId(id);
  if (data) {
    const originalPrice = data.price / (iva / 100 + 1);
    reset({
      name: data.name,
      price: data.iva ? originalPrice : data.price,
      stock: data.stock,
      unit: data.unit,
      iva: data.iva == true ? "true" : "false",
      type_of_currency: 'dollar'
    });
    setProduct(data);
  }
  setLoading(false);
};
