import { FieldArrayWithId, UseFieldArrayPrepend } from "react-hook-form";
import { Product } from "@/app/api/products/models";
import { calculateTotalPrice } from "@/utils";
import { ListProduct } from "@/app/api/list-products/models";
import { FormSale } from "../../../models";

export const changeSelect = ({
  products,
  prepend,
  value,
  fields,
  setTotalPrice,
}: {
  value: number;
  products: Product[];
  prepend: UseFieldArrayPrepend<FormSale, "list_products">;
  fields: FieldArrayWithId<FormSale, "list_products">[];
  setTotalPrice: (value: number) => void;
}) => {

  const fieldsUpdate: ListProduct[] = fields;
  const product = products.find((item) => item.id === value);
  
  fieldsUpdate.push({
    id: product?.id ?? 0,
    name: product?.name ?? "",
    price: product?.price ?? 0,
    unit: product?.unit ?? "unit",
    stock: 1,
  });

  const totalPrice = calculateTotalPrice(fieldsUpdate);
  setTotalPrice(totalPrice);
  if (product) {
    prepend({
      id: product.id,
      name: product.name,
      price: product.price,
      unit: product.unit,
      stock: 1,
    });
  }
};
