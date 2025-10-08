import { UseFormReset } from "react-hook-form";

import { FormProduct } from "../models/form-product.model";
import { Product } from "@/models/api/product";
import getDataById from "@/services/get/byId/getDataById";

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
  const data = await getDataById<Product>({ apiUrl: "/products", id });
  const product = data.data;
  if (product) {
    const originalPrice = product.price / (iva / 100 + 1);
    reset({
      name: product.name,
      price: product.iva ? originalPrice : product.price,
      stock: product.stock,
      unit: product.unit,
      iva: product.iva == true ? "true" : "false",
      type_of_currency: "dollar",
    });
    setProduct(product);
  }
  setLoading(false);
};
