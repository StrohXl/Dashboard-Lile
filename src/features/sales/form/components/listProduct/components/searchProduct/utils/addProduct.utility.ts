import { UseFieldArrayPrepend } from "react-hook-form";


import { Product } from "@/models/api/product";

import { FormSale } from "../../../../../models";

export function addProduct({
  product,
  prependProduct,
}: {
  product: Product;
  prependProduct: UseFieldArrayPrepend<FormSale, "list_products">;
}) {

  prependProduct({
    id: product.id,
    name: product.name,
    price: product.price,
    stock: 1,
    unit: product.unit,
  });
}
