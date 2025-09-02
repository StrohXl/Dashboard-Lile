import { UseFieldArrayPrepend } from "react-hook-form";
import { FormBuy } from "../models";
import { DataProduct } from "@/app/api/products/models";

export const changeSelect = ({
  products,
  prepend,
  value,
}: {
  value: number;
  products: DataProduct;
  prepend: UseFieldArrayPrepend<FormBuy>;
}) => {
  const product = products.data.find((item) => item.id === value);
  if (product) {
    prepend({
      id: product.id,
      name: product.name,
      price: 0.1,
      stock: 1,
      markup: 0.3,
      moneyType: "dollar",
      buyType: product.unit,
      sellingPrice: 0.1 * 1 * 0.3 + 0.1,
      type: "select",
    });
  }
};
