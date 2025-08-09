import TypeProduct from "@/app/api/products/type/typeProducts";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

export type TypeProductNew = TypeProduct & {
  type?: "create" | "select";
};

export type FormBuyType = {
  products: TypeProductNew[];
};

export type InputFormBuyType = {
  step?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  label: string;
  error: FieldError | undefined;
  placeholder?: string;
  register: UseFormRegister<FormBuyType>;
  nameField:
    | "products"
    | `products.${number}`
    | `products.${number}.id`
    | `products.${number}.name`
    | `products.${number}.price`
    | `products.${number}.stock`;
  options?: RegisterOptions<FormBuyType>;
  type?: HTMLInputTypeAttribute;
};
