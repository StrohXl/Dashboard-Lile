import { UseFormReturn } from "react-hook-form";
import { toast } from "react-toastify";

import { FormSale, SaleSchemaHook } from "../models";

export async function validatedStep1({
  contextSale,
  useFormSale,
}: {
  useFormSale: UseFormReturn<FormSale>;
  contextSale: SaleSchemaHook;
}) {
  const { id, setFormSteps, setTotalPayments, formSteps, dollar, totalPrice } =
    contextSale;

  const { trigger, getValues, setValue } = useFormSale;

  const listProducts = getValues("list_products");
  const listProductValidate = await trigger("list_products");
  const payments = await getValues("payments");

  if (listProducts.length != 0 && listProductValidate) {
    if (!id && payments.length == 1) {
      setValue(
        `payments.0.payment_amount`,
        Number((totalPrice * dollar).toFixed(2))
      );
      setTotalPayments(totalPrice);
    }

    setFormSteps(formSteps + 1);
  } else if (listProducts.length == 0) {
    toast.error("Agregue un producto");
  }
}
