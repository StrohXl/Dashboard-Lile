import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "../../../models";

export function prependPayment({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormSale, "payments">;
}) {
  prepend({
    id: 0,
    payment_amount: 0,
    payment_method: "efectivo Bs",
    operation: 0,
  });
}
