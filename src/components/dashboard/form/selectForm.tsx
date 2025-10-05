import { FieldValues } from "react-hook-form";
import { SelectFormType } from "./models";

export default function SelectForm<T extends FieldValues>({
  error,
  label,
  nameField,
  options,
  register,
  disabled,
  selectOptions,
  labelTheLast,
}: SelectFormType<T>) {
  return (
    <label
      className={`font-roboto relative  ${
        error ? "text-red-500" : "text-gray-700"
      }`}
    >
      {label && (
        <span className="flex mb-2  items-center gap-2">
          {label}:{labelTheLast}
        </span>
      )}
      <div
        className={`border-1
                       ${error ? "!border-red-500" : "border-gray-700"}  
                       ${disabled && "opacity-50 cursor-not-allowed"} 
                      focus-within:border-primary flex items-center px-3 py-[10px] gap-2 text-foreground   w-full rounded-sm `}
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
    </label>
  );
}
