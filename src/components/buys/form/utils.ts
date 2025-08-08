import { FormBuyType } from "./types";
import {
  FieldValues,
  UseFieldArrayPrepend,
  UseFieldArrayRemove,
} from "react-hook-form";
import TypeProduct from "@/app/api/products/type/typeProducts";

type DataProductType = {
  data: TypeProduct[];
  pages: number;
};

export const changeSelect = ({
  products,
  prepend,
  value,
}: {
  value: number;
  products: DataProductType;
  prepend: UseFieldArrayPrepend<FormBuyType>;
}) => {
  const product = products.data.find((item) => item.id === value);

  if (product) {
    prepend({
      id: product.id,
      name: product.name,
      price: 0,
      stock: 0,
    });
  }
};

export const appendField = ({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormBuyType>;
}) => {
  prepend({
    id: 0,
    name: "",
    price: 0.1,
    stock: 0.1,
    type: "create",
  });
};

export const removeField = ({
  index,
  remove,
}: {
  index: number;
  remove: UseFieldArrayRemove;
}) => {
  remove(index);
};

export const onSubmit = (body: FieldValues) => {
  console.log(body);
};
