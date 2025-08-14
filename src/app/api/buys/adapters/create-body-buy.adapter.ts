import { ListProduct } from "../../list-products/models";
import { CreateProduct, Product } from "../../products/models";

export const createBodyBuy = (body: ListProduct[]) => {
  const productsConnect: Product[] = [];
  const productsCreate: CreateProduct[] = [];
  body.forEach((item) => {
    if (item.id !== 0) {
      productsConnect.push({
        name: item.name,
        id: item.id ?? 1,
        price: item.selling_price,
        stock: item.stock,
      });
    } else {
      productsCreate.push({
        name: item.name,
        price: item.selling_price,
        stock: item.stock,
      });
    }
  });
  return { productsConnect, productsCreate };
};
