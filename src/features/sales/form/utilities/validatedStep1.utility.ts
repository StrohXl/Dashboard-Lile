import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { FormSale } from "../models";
import { ParamValue } from "next/dist/server/request/params";
import { toast } from "react-toastify";

export async function validatedStep1({
  formSteps,
  setFormSteps,
  getValues,
  trigger,
  totalPrice,
  setValue,
  dollar,
  setTotalPayments,
  id,
}: {
  totalPrice: number;
  getValues: UseFormGetValues<FormSale>;
  trigger: UseFormTrigger<FormSale>;
  formSteps: number;
  setValue: UseFormSetValue<FormSale>;
  dollar: number;
  setFormSteps: (value: number) => void;
  id: ParamValue;
  setTotalPayments: (value: number) => void;
}) {
  const listProducts = getValues("list_products");
  const listProductValidate = await trigger("list_products");
  if (listProducts.length != 0 && listProductValidate) {
    if (!id) {
      setValue(
        `payments.0.payment_amount`,
        Number((totalPrice * dollar).toFixed(2))
      );
      setTotalPayments(totalPrice);
    }

    setFormSteps(formSteps + 1);
  }
  else if(listProducts.length == 0){
    toast.error('Agregue un producto');
  }
}
