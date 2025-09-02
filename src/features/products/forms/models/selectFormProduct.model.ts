import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { FormProduct } from "./form-product.model";

export interface SelectFormProductType {
  label: string;
  error: FieldError | undefined;
  register: UseFormRegister<FormProduct>;
  options?: RegisterOptions<FormProduct>;
  disabled?: boolean;
  selectOptions: { title: string; value: number | string }[];
  nameField: Path<FormProduct>;
}
