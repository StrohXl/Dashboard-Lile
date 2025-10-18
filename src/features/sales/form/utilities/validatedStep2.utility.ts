import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

import { FormSale, SaleSchemaHook } from "../models";

export async function validatedStep2({
  contextSale,
  useFormSale,
}: {
  useFormSale: UseFormReturn<FormSale>;
  contextSale: SaleSchemaHook;
}) {
  const { setFormSteps, totalPayments, totalChanges, formSteps, totalPrice } =
    contextSale;

  const { trigger } = useFormSale;

  const listPayments = await trigger("payments");
  const listChanges = await trigger("change_manager");
  const turned = Number(Math.abs(totalPayments - totalPrice).toFixed(2));
  if (listPayments && listChanges) {
    if (totalPayments > totalPrice && turned != totalChanges) {
      toast.error("Error en el cambio entregado");
    } else {
      setFormSteps(formSteps + 1);
    }
  }
}
