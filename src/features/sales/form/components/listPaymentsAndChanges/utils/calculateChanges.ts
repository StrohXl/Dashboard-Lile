import { UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";

export const calculateChanges = ({
  getValues,
  setTotalChanges,
  dollar,
}: {
  dollar: number;
  setTotalChanges: (value: number) => void;
  getValues: UseFormGetValues<FormSale>;
}) => {
  const changeManager = getValues("change_manager");
  const totalChanges = changeManager.reduce(
    (accumulator, item) =>
      accumulator +
      (item.change_method == "divisa"
        ? Number(item.change_amount)
        : Number(item.change_amount) / dollar),
    0
  );
  console.log(totalChanges)
  setTotalChanges(Number(totalChanges));
};
