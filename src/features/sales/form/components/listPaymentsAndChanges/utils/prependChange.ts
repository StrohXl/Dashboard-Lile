import { UseFieldArrayPrepend } from "react-hook-form";

import { FormSale } from "../../../models";

export function prependChange({
  prepend,
  dollar,
  totalPrice,
  totalChanges,
  totalPayments,
}: {
  prepend: UseFieldArrayPrepend<FormSale, "change_manager">;
  dollar: number;
  totalPrice: number;
  totalPayments: number;
  totalChanges: number;
}) {
  const rest = Math.abs(totalPayments - totalPrice);
  const amount =
    totalChanges >= rest
      ? 0
      : Number(Math.abs((rest - totalChanges) * dollar).toFixed(2));

  prepend({
    id: 0,
    change_amount: amount,
    change_method: "efectivoBs",
  });
}
