import { ListProduct } from "../models";

export const createListProduct = (body: ListProduct[]): ListProduct[] => {
  const list_products: ListProduct[] = [];
  body.forEach((item) => {
    list_products.push({
      name: item.name,
      price: item.price,
      stock: item.stock,
      selling_price: item.selling_price,
    });
  });
  return list_products;
};
