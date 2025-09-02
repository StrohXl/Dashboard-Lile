import { CreateProduct } from "../../products/validators/product.validator";
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
        unit: item.unit,
      });

    } else {
      productsCreate.push({
        name: item.name,
        price: item.selling_price,
        stock: item.stock,
        unit: item.unit,
      });
    }
  });

  return { productsConnect, productsCreate };
};
