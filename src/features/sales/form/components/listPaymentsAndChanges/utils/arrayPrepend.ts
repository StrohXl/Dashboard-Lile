import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "../../../models";
import { OptionList } from "../models/optionList.model";

export function arrayPrepend({
  option,
  paymentPrepend,
  changePrepend,
}: {
  paymentPrepend: UseFieldArrayPrepend<FormSale, "payments">;
  changePrepend: UseFieldArrayPrepend<FormSale, "change_manager">;
  option: OptionList;
}) {
  if (option == "payments") {
    paymentPrepend({
      id: 0,
      payment_amount: 0,
      payment_method: "efectivo Bs",
      operation: 0,
    });
  } else {
    changePrepend({
      id: 0,
      change_amount: 0,
      change_method: "efectivo Bs",
      operation: 0,
    });
  }
}
