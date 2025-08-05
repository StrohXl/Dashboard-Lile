import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import { ReactNode } from "react";
import TypeProduct from "@/app/api/products/type/typeProducts";
import MessageError from "@/components/dashboard/forms/components/messageError";

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
}: {
  step?: string;
  defaultValue?: string | number;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  label: string;
  error: FieldError | undefined;
  placeholder?: string;
  register: UseFormRegister<TypeProduct>;
  nameField: Path<TypeProduct>;
  options?: RegisterOptions<TypeProduct>;
  type?: string;
}) {
  return (
    <label
      className={`font-roboto  ${error ? "text-red-500" : "text-gray-700"}`}
    >
      {label}:
      <div
        className={`border-1
           ${error ? "!border-red-500" : "border-gray-700"}
          focus-within:border-primary flex items-center mt-2 px-3 py-2 gap-2 text-foreground   w-full rounded-sm `}
      >
        {iconStart && (
          <span className={`text-gray-700 ${error && "text-red-500"}`}>
            {iconStart}
          </span>
        )}
        <input
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
