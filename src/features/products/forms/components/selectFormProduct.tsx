import MessageError from "@/components/message-error/messageError";
import { SelectFormProductType } from "../models/selectFormProduct.model";

export function SelectFormProduct({
  error,
  label,
  nameField,
  options,
  register,
  disabled,
  selectOptions,
}: SelectFormProductType) {
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
              focus-within:border-primary flex items-center mt-2 px-3 py-[10px] gap-2 text-foreground   w-full rounded-sm `}
      >
        <select
          disabled={disabled}
          className={`w-full bg-transparent autofill:bg-transparent outline-none ${
            disabled && "disabled:cursor-not-allowed"
          }`}
          {...register(nameField, options)}
        >
          {selectOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>

      </div>
      <MessageError error={error} />
    </label>
  );
}

