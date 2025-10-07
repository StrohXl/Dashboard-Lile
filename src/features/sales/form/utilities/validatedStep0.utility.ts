import { UseFormTrigger } from "react-hook-form";

import { FormSale } from "../models";

export async function validatedStep0({
  trigger,
  formSteps,
  setFormSteps,
}: {
  formSteps: number;
  setFormSteps: (value: number) => void;
  trigger: UseFormTrigger<FormSale>;
}) {
  const validatedClient = await trigger("client");
  if (validatedClient) {
    setFormSteps(formSteps + 1);
  }
}
