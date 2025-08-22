import { CreateProduct } from "../../products/models";

export const createListProduct = (body: CreateProduct[]): CreateProduct[] => {
  const list_products: CreateProduct[] = [];
  body.forEach((item) => {
    list_products.push({
      name: item.name,
      price: item.price,
      stock: item.stock,
    });
  });
  return list_products;
};
