import { CreateBuy } from "@/models/api/buy";
import { CreateProduct } from "@/models/api/product";

interface ProductConnect extends CreateProduct {
  id: number;
}

export const createBodyBuy = (body: CreateBuy) => {
  const productsConnect: ProductConnect[] = [];
  const productsCreate: CreateProduct[] = [];

  body.products.forEach((item) => {
    if (item.id !== 0) {
      productsConnect.push({
        name: item.name,
        id: item.id,
        price: item.selling_price,
        stock: item.stock,
        unit: item.unit,
        iva: item.iva,
      });
    } else {
      productsCreate.push({
        name: item.name,
        price: item.selling_price,
        stock: item.stock,
        unit: item.unit,
        iva: item.iva,
      });
    }
  });

  return { productsConnect, productsCreate };
};
