import { UseFormTrigger } from "react-hook-form";
import { FormSale } from "../models";

export async function validatedStep2({
  formSteps,
  setFormSteps,
  trigger,
  totalChanges,
  totalPayments,
  totalPrice,
}: {
  trigger: UseFormTrigger<FormSale>;
  formSteps: number;
  setFormSteps: (value: number) => void;
  totalChanges: number;
  totalPayments: number;
  dollar: number;
  totalPrice: number;
}) {
  
  const listPayments = await trigger("payments");
  const listChanges = await trigger("change_manager");
  const totalDebt = totalPayments - totalPrice - totalChanges;

  if (listPayments && listChanges && totalDebt <= 0.009) {
    if (totalPayments > 0) {
      if (totalChanges <= 0) {
        setFormSteps(formSteps + 1);
      } else if (
        totalChanges > 0 &&
        totalPayments - totalPrice == totalChanges
      ) {
        setFormSteps(formSteps + 1);
      }
    } else if (totalPayments == 0 && totalChanges == 0) {
      setFormSteps(formSteps + 1);
    }
  }
}
