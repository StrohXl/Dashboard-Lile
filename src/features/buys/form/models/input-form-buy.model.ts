import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";
import { FormBuy } from "./form-buy.model";

export interface InputFormBuy {
  step?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  error: FieldError | undefined;
  label: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  placeholder?: string;
  nameField:
    | "products"
    | `products.${number}`
    | `products.${number}.id`
    | `products.${number}.name`
    | `products.${number}.price`
    | `products.${number}.sellingPrice`
    | `products.${number}.markup`
    | `products.${number}.stock`;
  options?: RegisterOptions<FormBuy>;
  register: UseFormRegister<FormBuy>;
  type?: HTMLInputTypeAttribute;
}
