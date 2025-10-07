import { UseFormTrigger } from "react-hook-form";
import { toast } from "react-toastify";

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
  const turned = Number(Math.abs(totalPayments - totalPrice).toFixed(2));
  if (listPayments && listChanges) {
    if(totalPayments>totalPrice && turned != totalChanges){
      toast.error('Error en el cambio entregado');
    }
    else{
       setFormSteps(formSteps + 1);
    }

  }
}
