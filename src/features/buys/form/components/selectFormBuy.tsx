import MessageError from "@/components/message-error/messageError";
import type { SelectFormBuy } from "../models";

function SelectFormBuy({
  error,
  label,
  iconEnd,
  nameField,
  options,
  register,
  selectOptions,
}: SelectFormBuy) {
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
              focus-within:border-primary flex items-center mt-2 px-3 py-2 gap-2 text-foreground   w-full rounded-sm `}
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

export default SelectFormBuy;
