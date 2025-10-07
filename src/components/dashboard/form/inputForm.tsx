import { FieldValues } from "react-hook-form";

import MessageError from "@/components/dashboard/form/message-error/messageError";

import { InputFormType } from "./models";

export default function InputForm<T extends FieldValues>({
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
  labelTheLast,
  messageError = true,
}: InputFormType<T>) {

    return (
      <label
        className={`font-roboto  ${error ? "text-red-500" : "text-gray-700"}`}
      >
        {label && (
          <span className="flex mb-2  items-center gap-2">
            {label}:{labelTheLast}
          </span>
        )}
        <div
          className={`${type  !== 'hidden' && 'border-1'}
                   ${error ? "!border-red-500" : "border-gray-700"}
                   ${disabled && "opacity-50 cursor-not-allowed"}
                  focus-within:border-primary flex items-center px-3 py-2 gap-2 text-foreground   w-full rounded-sm `}
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
        {messageError && <MessageError error={error} />}
      </label>
    );
}
