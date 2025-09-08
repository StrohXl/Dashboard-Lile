import { UseFormReset } from "react-hook-form";
import { FormSale } from "../models";

export function resetAll({
  reset,
  setFormSteps,
  setTotalChanges,
  setTotalPayments,
  setTotalPrice,
}: {
  reset: UseFormReset<FormSale>;
  setFormSteps: (value: number) => void;
  setTotalPrice: (value: number) => void;
  setTotalPayments: (value: number) => void;
  setTotalChanges: (value: number) => void;
}) {
  reset();
  reset({
    client: {
      ci: "",
      id: 0,
      last_name: "",
      name: "",
    },
  });
  setTotalPayments(0);
  setTotalChanges(0);
  setTotalPrice(0);
  setFormSteps(0);
}
