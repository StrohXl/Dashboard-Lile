import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormTrigger,
} from "react-hook-form";
import { validatedStep0 } from "./validatedStep0.utility";
import { validatedStep1 } from "./validatedStep1.utility";
import { validatedStep2 } from "./validatedStep2.utility";
import { FormSale } from "../models";
import { ParamValue } from "next/dist/server/request/params";

export function nextForm({
  formSteps,
  getValues,
  setFormSteps,
  trigger,
  dollar,
  totalChanges,
  totalPayments,
  setValue,
  totalPrice,
  setTotalPayments,
  id,
}: {
  getValues: UseFormGetValues<FormSale>;
  trigger: UseFormTrigger<FormSale>;
  formSteps: number;
  setFormSteps: (value: number) => void;
  totalChanges: number;
  totalPayments: number;
  dollar: number;
  setValue: UseFormSetValue<FormSale>;
  totalPrice: number;
  setTotalPayments: (value: number) => void;
  id: ParamValue;
}) {
  setTimeout(() => {
    switch (formSteps) {
      case 0:
        validatedStep0({ formSteps, setFormSteps, trigger });
        break;
      case 1:
        validatedStep1({
          formSteps,
          getValues,
          setFormSteps,
          trigger,
          setValue,
          dollar,
          totalPrice,
          setTotalPayments,
          id,
        });
        break;
      case 2:
        validatedStep2({
          formSteps,
          setFormSteps,
          trigger,
          dollar,
          totalChanges,
          totalPayments,
          totalPrice,
        });
        break;
      default:
        break;
    }
  }, 200);
}
