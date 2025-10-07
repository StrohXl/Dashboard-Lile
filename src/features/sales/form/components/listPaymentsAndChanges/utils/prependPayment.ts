import { UseFieldArrayPrepend } from "react-hook-form";

import { FormSale } from "../../../models";

export function prependPayment({
  prepend,
  dollar,
  totalPrice,
  totalPayments
}: {
  prepend: UseFieldArrayPrepend<FormSale, "payments">;
  dollar: number;
  totalPrice: number;
  totalPayments: number;
}) {
  const amount =
    totalPayments >= totalPrice
      ? 0
      : Number((Math.abs(totalPayments - totalPrice) * dollar).toFixed(2));
  prepend({
    id: 0,
    payment_amount: amount,
    payment_method: "efectivo Bs",
  });
}
