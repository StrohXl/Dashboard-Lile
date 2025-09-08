import { ReactNode } from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormSale } from "./formSale.model";

interface SelectOptions {
  value: number | string;
  title: string;
}

type NameFields =
  | "payments"
  | `payments.${number}`
  | `payments.${number}.payment_method`
  | "change_manager"
  | `change_manager.${number}`
  | `change_manager.${number}.change_method`;

export interface SelectFormSale {
  error: FieldError | undefined;
  label?: string;
  iconEnd?: ReactNode;
  selectOptions: SelectOptions[];
  nameField: NameFields;
  options?: RegisterOptions<FormSale, NameFields>;
  register: UseFormRegister<FormSale>;
}
