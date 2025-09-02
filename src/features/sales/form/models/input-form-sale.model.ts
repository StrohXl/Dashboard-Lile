import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormSale } from "./formSale.model";

export interface InputFormSale {
  step?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  error: FieldError | undefined;
  label?: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  placeholder?: string;
  hiddenMessageError?: boolean;
  nameField:
    | "list_products"
    | `list_products.${number}`
    | `list_products.${number}.id`
    | `list_products.${number}.name`
    | `list_products.${number}.price`
    | `list_products.${number}.stock`
    | `payments.${number}.payment_method`
    | `payments.${number}.payment_amount`
    | `payments.${number}.operation`
    | `change_manager.${number}.payment_method`
    | `change_manager.${number}.payment_amount`
    | `change_manager.${number}.operation`;

  options?: RegisterOptions<FormSale>;
  register: UseFormRegister<FormSale>;
  type?: HTMLInputTypeAttribute;
}
