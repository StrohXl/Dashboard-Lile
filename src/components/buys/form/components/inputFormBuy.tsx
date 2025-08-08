import MessageError from "@/components/dashboard/forms/components/messageError";
import { InputFormBuyType } from "../types";

export default function InputFormBuy({
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
}: InputFormBuyType) {
  return (
    <label
      className={`font-roboto relative  ${error ? "text-red-500" : "text-gray-700"}`}
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
