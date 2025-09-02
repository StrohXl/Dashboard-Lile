import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "../../../models";

export function prependPayment(
  prepend: UseFieldArrayPrepend<FormSale, "payments">
) {
  prepend({
    payment_amount: 0,
    payment_method: "efectivo Bs",
    operation: 0,
  });
}
