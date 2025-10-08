import { Client } from "@/models/api/client/client.model";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";


import MessageError from "@/components/dashboard/form/message-error/messageError";

interface InputForm {
  label: string;
  error: FieldError | undefined;
  placeholder?: string;
  register: UseFormRegister<Client>;
  nameField: Path<Client>;
  options?: RegisterOptions<Client>;
  type?: HTMLInputTypeAttribute;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  step?: string;
  disabled?: boolean;
}

export default function InputFormClient({
  label,
  error,
  placeholder,
  register,
  nameField,
  options,
  type,
  iconStart,
  iconEnd,
  step,
  disabled,
}: InputForm) {
  return (
    <label
      className={`font-roboto relative  ${
        error ? "text-red-500" : "text-gray-700"
      }`}
    >
      <span>{label}:</span>
      <div
        className={`border-1
           ${error ? "!border-red-500" : "border-gray-700"}
           ${disabled && "opacity-50 cursor-not-allowed"}
          focus-within:border-primary flex items-center mt-2 px-3 py-2 gap-2 text-foreground   w-full rounded-sm `}
      >
        {iconStart && (
          <span className={`text-gray-700 ${error && "text-red-500"}`}>
            {iconStart}
          </span>
        )}
        <input
          disabled={disabled}
          className="w-full bg-transparent autofill:bg-transparent outline-none"
          autoComplete="off"
          type={type}
          step={step}
          placeholder={placeholder}
          {...register(nameField, options)}
        />
        {iconEnd && (
          <span className={`text-gray-700 ${error && "text-red-500"}`}>
            {iconEnd}
          </span>
        )}
      </div>
      <MessageError error={error} />
    </label>
  );
}
