import { UseFieldArrayPrepend } from "react-hook-form";
import { FormBuy } from "../models";

export const appendField = ({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormBuy>;
}) => {
  prepend({
    id: 0,
    name: "",
    price: 0.1,
    stock: 1,
    moneyType: "dollar",
    buyType: "individual",
    type: "create",
    markup: 0.3,
    sellingPrice: 0.1 * 1 * 0.3 + 0.1,
  });
};
