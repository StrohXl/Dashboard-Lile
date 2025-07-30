import {
  FieldError,
  Path,
  RegisterOptions,
  UseFormRegister,
} from "react-hook-form";
import MessageError from "./messageError";
import TypeProduct from "@/app/api/products/type/typeProducts";

export default function InputFormText({
  label,
  error,
  placeholder,
  register,
  nameField,
  options,
}: {
  label: string;
  error: FieldError | undefined;
  placeholder?: string;
  register: UseFormRegister<TypeProduct>;
  nameField: Path<TypeProduct>;
  options?: RegisterOptions<TypeProduct>;
}) {
  return (
    <label
      className={`font-roboto  ${error ? "text-red-500" : "text-gray-600"}`}
    >
      {label}:
      <input
        placeholder={placeholder}
        className={`border-1 mt-2 text-foreground   w-full rounded-sm py-2 px-3 outline-none ${
          error ? "!border-red-500" : "!border-gray-400 focus:!border-primary "
        }`}
        {...register(nameField, options)}
      />
      <MessageError error={error} />
    </label>
  );
}
