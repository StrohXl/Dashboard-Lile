import { CreateProduct } from "../../products/validators/product.validator";

export const createListProduct = (body: CreateProduct[]): CreateProduct[] => {
  const list_products: CreateProduct[] = [];
  body.forEach((item) => {
    list_products.push({
      name: item.name,
      price: item.price,
      stock: item.stock,
      unit: item.unit,
    });
  });
  return list_products;
};
