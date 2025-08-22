import { CreateProduct } from "../../products/models";
import { CreateBuy } from "../validators/createBuy.validator";

export const createBodyBuy = (body: CreateBuy) => {
  const productsConnect: CreateProduct[] = [];
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
