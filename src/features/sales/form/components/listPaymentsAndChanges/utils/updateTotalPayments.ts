import { UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";
import { getTotalPayments } from "./getTotalPayments.utility";

export const updateTotalPayments = ({
  getValues,
  setTotalPayments,
  dollar,
}: {
  dollar: number;
  getValues: UseFormGetValues<FormSale>;
  setTotalPayments: (value: number) => void;
}) => {
  const totalPayments = getTotalPayments({ dollar, getValues });
  setTotalPayments(Number((totalPayments).toFixed(2)));
};
