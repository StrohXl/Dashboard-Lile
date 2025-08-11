import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  FieldError,
  RegisterOptions,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

export type TypeProductNew = {
  type?: "create" | "select";
  priceBs: number;
  sellingPrice: number;
  markup: number;
  id?: number;
  name: string;
  price: number;
  stock: number;
};

export type FormBuyType = {
  products: TypeProductNew[];
};

export type InputFormBuyType = {
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
    | `products.${number}.priceBs`
    | `products.${number}.sellingPrice`
    | `products.${number}.markup`
    | `products.${number}.stock`;
  options?: RegisterOptions<FormBuyType>;
  register: UseFormRegister<FormBuyType>;
  type?: HTMLInputTypeAttribute;
};

export type SelectFormBuyType = {
  error: FieldError | undefined;
  label: string;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  placeholder?: string;
  setValue: UseFormSetValue<FormBuyType>;
  index: number;
  getValues: UseFormGetValues<FormBuyType>;
  selectOptions: {
    value: number;
    title: string;
  }[];
  nameField:
    | "products"
    | `products.${number}`
    | `products.${number}.id`
    | `products.${number}.name`
    | `products.${number}.price`
    | `products.${number}.priceBs`
    | `products.${number}.sellingPrice`
    | `products.${number}.markup`
    | `products.${number}.stock`;
  options?: RegisterOptions<FormBuyType>;
  register: UseFormRegister<FormBuyType>;
};
