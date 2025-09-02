import { CreateProduct } from "@/app/api/products/validators/product.validator";
import { FormProduct } from "../models/form-product.model";

export const createBodyProduct = (body: FormProduct) => {
  const product: CreateProduct = {
    name: body.name.toLocaleLowerCase(),
    price: Number(body.price),
    stock: Number(body.stock),
    unit: body.unit
  };
  return product;
};
