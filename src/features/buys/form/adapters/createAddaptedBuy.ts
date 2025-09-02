import { FormBuy } from "../models";
import { CreateBuy } from "@/app/api/buys/validators/createBuy.validator";

export const createAddaptedBuy = (body: FormBuy) => {
  const newBody: CreateBuy = [];

  body.products.forEach((item) => {
    const price = item.sellingPrice / (Number(item.markup) + 1);
    newBody.push({
      id: item.id,
      name: item.name,
      price: Number(price),
      stock: Number(item.stock),
      selling_price: Number(item.sellingPrice),
      unit:
        item.buyType == "kg"
          ? "kg"
          : item.buyType == "package"
          ? "package"
          : "unit",
    });
  });
  return newBody;
};
