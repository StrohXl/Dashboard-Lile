import { ListProduct } from "@/app/api/list-products/models";
import { FormBuy } from "../models";

export const createAddaptedBuy = (body: FormBuy) => {
  const newBody: ListProduct[] = [];

  body.products.forEach((item) => {
    const price = item.sellingPrice / (Number(item.markup) + 1);
    newBody.push({
      id: item.id,
      name: item.name,
      price: Number(price),
      stock: Number(item.stock),
      selling_price: Number(item.sellingPrice),
    });
  });
  return newBody;
};
