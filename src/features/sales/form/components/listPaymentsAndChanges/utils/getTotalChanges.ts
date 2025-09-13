import { UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";

export default function getTotalChanges({
  getValues,
  dollar,
}: {
  dollar: number;
  getValues: UseFormGetValues<FormSale>;
}) {
  const changeManager = getValues("change_manager");
  const totalChanges = changeManager.reduce(
    (accumulator, item) =>
      accumulator +
      (item.change_method == "divisa"
        ? Number(item.change_amount)
        : Number(item.change_amount) / dollar),
    0
  );
  return totalChanges;
}
