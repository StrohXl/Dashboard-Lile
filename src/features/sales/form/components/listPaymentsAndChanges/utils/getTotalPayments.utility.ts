import { UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";

export const getTotalPayments = ({
  getValues,
  dollar,
}: {
  dollar: number;
  getValues: UseFormGetValues<FormSale>;
}) => {
  const payments = getValues("payments");
  const totalPayments = payments.reduce(
    (accumulator, item) =>
      accumulator +
      (item.payment_method == "divisa"
        ? Number(item.payment_amount)
        : Number(item.payment_amount) / dollar),
    0
  );
  return totalPayments;
};
