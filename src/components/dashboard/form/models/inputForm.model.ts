import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type InputFormType<T extends FieldValues> = {
  step?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  label?: string;
  labelTheLast?: string | ReactNode;
  error: FieldError | undefined;
  messageError?: boolean;
  placeholder?: string;
  register: UseFormRegister<T>;
  nameField: Path<T>;
  options?: RegisterOptions<T>;
  type?: HTMLInputTypeAttribute;
};
