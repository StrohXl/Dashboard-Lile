import { UseFormReturn } from "react-hook-form";

import { FormSale, SaleSchemaHook } from "../models";
import { validatedStep0 } from "./validatedStep0.utility";
import { validatedStep1 } from "./validatedStep1.utility";
import { validatedStep2 } from "./validatedStep2.utility";

export function nextForm({
  contextSale,
  useFormSale,
}: {
  useFormSale: UseFormReturn<FormSale>;
  contextSale: SaleSchemaHook;
}) {
  const { setFormSteps, formSteps } = contextSale;

  const { trigger } = useFormSale;

  setTimeout(() => {
    switch (formSteps) {
      case 0:
        validatedStep0({ formSteps, setFormSteps, trigger });
        break;
      case 1:
        validatedStep1({
          contextSale,
          useFormSale,
        });
        break;
      case 2:
        validatedStep2({
          contextSale,
          useFormSale,
        });
        break;
      default:
        break;
    }
  }, 200);
}
