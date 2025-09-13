import { UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";
import getTotalChanges from "./getTotalChanges";

export const updateTotalChanges = ({
  getValues,
  setTotalChanges,
  dollar,
}: {
  dollar: number;
  setTotalChanges: (value: number) => void;
  getValues: UseFormGetValues<FormSale>;
}) => {
  const totalChanges = getTotalChanges({ dollar, getValues });
  setTotalChanges(Number((totalChanges).toFixed(2)));
};
