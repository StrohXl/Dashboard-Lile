import { UseFieldArrayPrepend } from "react-hook-form";
import { FormBuy } from "../../../models";

export const appendField = ({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormBuy>;
}) => {
  prepend({
    id: 0,
    name: "",
    stock: 1,
    sellingPrice: 0,
    iva: "false",
    purchase_price: 0,
    unit: "unit",
    type_of_currency_for_sale: 'dollar',
    type_of_currency_of_the_purchase: "bs"
  });
};
