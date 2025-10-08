
import { CreateBuy } from "@/models/api/buy";
import { FormBuy } from "../models";

export const createAddaptedBuy = ({
  body,
  iva,
}: {
  body: FormBuy;
  iva: number;
}) => {
  const newBody: CreateBuy = { products: [] };

  body.products.forEach((item) => {
    const price =
      item.unit == "kg"
        ? item.purchase_price
        : item.purchase_price / item.stock;
    const selling_price = Number(item.selling_price);
    newBody.products.push({
      id: item.id,
      name: item.name,
      purchase_price: Number(price),
      stock: Number(item.stock),
      selling_price:
        item.iva == "true"
          ? Number(
              (selling_price * Number(`0.${iva}`) + selling_price).toFixed(2)
            )
          : Number(selling_price.toFixed(2)),
      unit: item.unit,
      iva: item.iva == "true" ? true : false,
    });
  });
  return newBody;
};
