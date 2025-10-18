import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

interface Options {
  title: string;
  value: string;
}

interface GroupRadioProps<T extends FieldValues> {
  label: string;
  options: Options[];
  register: UseFormRegister<T>;
  nameField: Path<T>;
  setValue: UseFormSetValue<T>;
  disabled?: boolean;
}
export default function GroupRadio<T extends FieldValues>({
  options,
  register,
  nameField,
  setValue,
  label,
  disabled,
}: GroupRadioProps<T>) {
  return (
    <div className={`font-roboto`}>
      {<span className="block mb-2 text-gray-700 dark:text-white">{label}:</span>}
      <div
        className={`container-group grid grid-cols-${options.length} items-center gap-2`}
      >
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() =>
              !disabled &&
              setValue(nameField, item.value as PathValue<T, Path<T>>)
            }
            className={`border-1 border-gray-400 dark:border-white  dark:text-white flex items-center px-3 bg-gray-100 dark:bg-transparent py-2 gap-2 text-foreground  rounded-sm    ${
              disabled && "opacity-50 cursor-not-allowed"
            }`}
          >
            <input
              disabled={disabled}
              type="radio"
              {...register(nameField)}
              value={item.value}
            />
            <label>{item.title}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
