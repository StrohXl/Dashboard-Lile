import { UseFormGetValues, UseFormSetValue } from "react-hook-form";

import { FormSale } from "../../../models";
import { OptionList } from "../models/optionList.model";
import { getTotalPayments } from "./getTotalPayments.utility";
import { updateTotalChanges } from "./updateTotalChanges";
import { updateTotalPayments } from "./updateTotalPayments";

export default function onChangeSelect({
  getValues,
  option,
  index,
  setValue,
  dollar,
  totalPrice,
  value,
  setTotalPayments,
  setTotalChanges,
}: {
  option: OptionList;
  getValues: UseFormGetValues<FormSale>;
  setValue: UseFormSetValue<FormSale>;
  index: number;
  totalPrice: number;
  dollar: number;
  value: "divisa" | "transferencia" | "efectivoBs";
  setTotalPayments: (value: number) => void;
  setTotalChanges: (value: number) => void;
}) {
  if (option == "payments") {
    const payments = getValues("payments");
    payments[index].payment_amount = 0;
    const totalPayments = payments.reduce(
      (accumulator, item) =>
        accumulator +
        (item.payment_method == "divisa"
          ? Number(item.payment_amount)
          : Number(item.payment_amount) / dollar),
      0
    );

    const restantePayments = totalPrice - totalPayments;

    if (value == "divisa") {
      if (Math.abs(totalPayments) > totalPrice) {
        setValue(`payments.${index}.payment_amount`, 0);
      } else {
        setValue(
          `payments.${index}.payment_amount`,
          Number(Math.abs(restantePayments).toFixed(2))
        );
        updateTotalPayments({ dollar, getValues, setTotalPayments });
      }
    } else {
      if (Math.abs(totalPayments) > totalPrice) {
        setValue(`payments.${index}.payment_amount`, 0);
      } else {
        setValue(
          `payments.${index}.payment_amount`,
          Number(
            Math.abs(
              Math.abs(restantePayments * dollar)
            ).toFixed(2)
          )
        );
        updateTotalPayments({ dollar, getValues, setTotalPayments });
      }
    }
  } else {
    const changeManager = getValues("change_manager");
    changeManager[index].change_amount = 0;
    const totalChanges = changeManager.reduce(
      (accumulator, item) =>
        accumulator +
        (item.change_method == "divisa"
          ? Number(item.change_amount)
          : Number(item.change_amount) / dollar),
      0
    );

    const totalPayments = getTotalPayments({ dollar, getValues });
    const totalDebt = Math.abs(totalPrice - totalPayments);

    const totalSetValue = Math.abs(totalDebt - totalChanges);

    if (value == "divisa") {
      if (totalChanges >= totalDebt) {
        setValue(`change_manager.${index}.change_amount`, 0);
      } else {
        setValue(
          `change_manager.${index}.change_amount`,
          Number(totalSetValue.toFixed(2))
        );
        updateTotalChanges({ dollar, getValues, setTotalChanges });
      }
    } else {
      if (totalChanges >= totalDebt) {
        setValue(`change_manager.${index}.change_amount`, 0);
      } else {
        setValue(
          `change_manager.${index}.change_amount`,
          Number((totalSetValue * dollar).toFixed(2))
        );
        updateTotalChanges({ dollar, getValues, setTotalChanges });
      }
    }
  }
}
