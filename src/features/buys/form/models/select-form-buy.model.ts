import { ReactNode } from "react";
import {
  FieldError,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormBuy } from "./form-buy.model";

interface SelectOptions {
  value: number | string;
  title: string;
}

type NameFields =
  | "products"
  | `products.${number}`
  | `products.${number}.id`
  | `products.${number}.name`
  | `products.${number}.price`
  | `products.${number}.buyType`
  | `products.${number}.moneyType`
  | `products.${number}.sellingPrice`
  | `products.${number}.markup`
  | `products.${number}.stock`;

export interface SelectFormBuy {
  error: FieldError | undefined;
  label: string;
  pyDollar: number;
  iconEnd?: ReactNode;
  placeholder?: string;
  setValue: UseFormSetValue<FormBuy>;
  index: number;
  getValues: UseFormGetValues<FormBuy>;
  selectOptions: SelectOptions[];
  nameField: NameFields;
  options?: RegisterOptions<FormBuy>;
  register: UseFormRegister<FormBuy>;
}
