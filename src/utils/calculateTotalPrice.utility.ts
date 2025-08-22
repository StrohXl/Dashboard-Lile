import { ListProduct } from "../app/api/list-products/models";

export const calculateTotalPrice = (body: ListProduct[]) => {
  const totalPrice = body.reduce(
    (accumulator, item) =>
      accumulator + Number((item.price * item.stock).toFixed(2)),
    0
  );
  return totalPrice;
};
