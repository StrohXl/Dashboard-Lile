import { calculateTotalPrice } from "@/utils";
import { UseFormGetValues } from "react-hook-form";


import { FormSale } from "../../../models";

export const updateTotalPriceByListProduct = ({
  setTotalPrice,
  getValues,
}: {
  getValues: UseFormGetValues<FormSale>;
  setTotalPrice: (value: number) => void;
}) => {
  const fields = getValues("list_products");
  const totalPrice = calculateTotalPrice(fields);
  setTotalPrice(totalPrice);
};
