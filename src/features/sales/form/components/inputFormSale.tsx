import MessageError from "@/components/message-error/messageError";
import type { InputFormSale } from "../models";

export default function InputSaleForm({
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
  hiddenMessageError,
}: InputFormSale) {

  if(type !== "hidden"){
    return (
      <label
        className={`font-roboto relative  ${
          error ? "text-red-500" : "text-gray-700"
        }`}
      >
        {label && <span className="mb-2 block">{label}:</span>}
        <div
          className={`border-1
             ${error ? "!border-red-500" : "border-gray-700"}
             ${disabled && "!opacity-70 cursor-not-allowed"}
            focus-within:border-primary flex items-center px-3 py-2 gap-2 text-foreground   w-full rounded-sm `}
        >
          {iconStart && (
            <span className={`text-gray-700 ${error && "text-red-500"}`}>
              {iconStart}
            </span>
          )}
          <input
            disabled={disabled}
            className={`w-full bg-transparent autofill:bg-transparent outline-none ${
              disabled && "disabled:cursor-not-allowed"
            }`}
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
        {!hiddenMessageError && <MessageError error={error} />}
      </label>
    );
  } 
  else{
    return <div></div>
  }
}
