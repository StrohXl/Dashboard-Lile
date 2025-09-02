import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "../../../models";

export function prependChange(
  prepend: UseFieldArrayPrepend<FormSale, "change_manager">
) {
  prepend({
    payment_amount: 0,
    payment_method: "efectivo Bs",
    operation: 0,
  });
}
