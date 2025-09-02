import calculatePriceKg from "@/utils/calculatePriceKg.utility";
import { CreateProduct } from "../../products/validators/product.validator";

export const createListProduct = (body: CreateProduct[]): CreateProduct[] => {
  const list_products: CreateProduct[] = [];
  body.forEach((item) => {
    list_products.push({
      name: item.name,
      price:
        item.unit == "unit"
          ? item.price
          : calculatePriceKg({ price: item.price, weight: item.stock }),
      stock: item.stock,
      unit: item.unit,
    });
  });
  return list_products;
};
