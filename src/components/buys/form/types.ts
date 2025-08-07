import BuyType from "@/app/api/buys/type";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type InputFormBuyType = {
  step?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  label: string;
  error: FieldError | undefined;
  placeholder?: string;
  register: UseFormRegister<BuyType>;
  nameField: Path<BuyType>;
  options?: RegisterOptions<BuyType>;
  type?: HTMLInputTypeAttribute;
};
