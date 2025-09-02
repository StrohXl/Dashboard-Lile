import { ListProduct } from "../app/api/list-products/models";
import calculatePriceKg from "./calculatePriceKg.utility";

export const calculateTotalPrice = (body: ListProduct[]) => {
  const totalPrice = body.reduce(
    (accumulator, item) =>
      accumulator +
      Number(
        item.unit == "unit"
          ? item.price * item.stock
          : item.unit == "kg"
          ? calculatePriceKg({ price: item.price, weight: item.stock })
          : item.price * item.stock
      ),
    0
  );
    return totalPrice;
};
