import { ListProduct } from "../../list-products/models";

export const getTotalPrice = (body: ListProduct[]) => {
  const priceTotal = body.reduce(
    (accumulator, item) =>
      accumulator + Number((item.price * item.stock).toFixed(2)),
    0
  );
  return priceTotal;
};
