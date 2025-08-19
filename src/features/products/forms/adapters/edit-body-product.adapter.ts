import { CreateProduct } from "@/app/api/products/models";
import { FormProduct } from "../models/form-product.model";

export const editBodyProductAdapter = (body: FormProduct) => {
  const product: CreateProduct = {
    id: body.id,
    name: body.name.toLocaleLowerCase(),
    price: Number(body.price),
    stock: Number(body.stock),
  };
  return product;
};
