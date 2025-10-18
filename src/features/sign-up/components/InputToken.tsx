import { ClipboardEvent } from "react";
import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";

import { FormSignUpModel } from "../models/formSignUp.model";

export default function InputToken({
  register,
  inputName,
  options,
  onPaste,
  error,
}: {
  register: UseFormRegister<FormSignUpModel>;
  inputName: Path<FormSignUpModel>;
  options?: RegisterOptions<FormSignUpModel>;
  onPaste: (event: ClipboardEvent<HTMLInputElement>) => void;
  error: FieldError | undefined;
}) {
  return (
    <input
      className={`w-12 h-14 text-center text-lg font-bold border-1 border-gray-300 dark:border-gray-600 rounded outline-none focus:border-gray-800 focus:dark:border-white ${error && "!border-red-500"}`}
      type="text"
      {...register(inputName, options)}
      onPaste={onPaste}
      autoComplete="off"
    />
  );
}
