import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { HTMLInputTypeAttribute, ReactNode } from "react";
import MessageError from "@/components/dashboard/forms/components/messageError";
import { ProductPriceBsType } from "../formProduct";

export default function InputFormProduct({
  label,
  error,
  placeholder,
  register,
  nameField,
  options,
  type,
  defaultValue,
  iconStart,
  iconEnd,
  step,
  disabled,
}: {
  step?: string;
  disabled?: boolean;
  defaultValue?: string | number;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  label: string;
  error: FieldError | undefined;
  placeholder?: string;
  register: UseFormRegister<ProductPriceBsType>;
  nameField: Path<ProductPriceBsType>;
  options?: RegisterOptions<ProductPriceBsType>;
  type?: HTMLInputTypeAttribute;
}) {
  return (
    <label
      className={`font-roboto  ${error ? "text-red-500" : "text-gray-700"}`}
    >
      {label}:
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
          defaultValue={defaultValue}
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
