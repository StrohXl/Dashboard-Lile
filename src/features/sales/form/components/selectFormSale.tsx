import MessageError from "@/components/message-error/messageError";
import { SelectFormSale } from "../models";

export function SelectSaleForm({
  error,
  label,
  iconEnd,
  nameField,
  options,
  register,
  selectOptions,
}: SelectFormSale) {
  return (
    <label
      className={`font-roboto relative  ${
        error ? "text-red-500" : "text-gray-700"
      }`}
    >
      {label && <span className="mb-2" >{label}:</span>}
      <div
        className={`border-1
               ${error ? "!border-red-500" : "border-gray-700"}
              focus-within:border-primary flex items-center px-3 py-[10px] gap-2 text-foreground   w-full rounded-sm `}
      >
        <select
          className="w-full bg-transparent autofill:bg-transparent outline-none"
          {...register(nameField, options)}
        >
          {selectOptions.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
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
