import { ReactNode } from "react";
import {
  FieldError,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

export type SelectFormType<T extends FieldValues> = {
  label?: string;
  labelTheLast?: string | ReactNode;
  error: FieldError | undefined;
  register: UseFormRegister<T>;
  options?: RegisterOptions<T>;
  disabled?: boolean;
  selectOptions: { title: string; value: number | string }[];
  nameField: Path<T>;
};
