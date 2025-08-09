import { LuDollarSign } from "react-icons/lu";
import InputFormBuy from "./inputFormBuy";
import { HiArchiveBox } from "react-icons/hi2";
import { removeField } from "../utils";
import { IoClose } from "react-icons/io5";
import NotHaveProducts from "./notHaveProducts";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";
import { FormBuyType } from "../types";

export default function BodyFormBuy({
  fields,
  register,
  errors,
  remove,
}: {
  fields: FieldArrayWithId<FormBuyType>[];
  register: UseFormRegister<FormBuyType>;
  errors: FieldErrors<FormBuyType>;
  remove: UseFieldArrayRemove;
}) {
  return (
    <div
      className={`container-fields gap-4 flex flex-col`}
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className={`grid ${
            fields.length > 0 &&
            index != fields.length - 1 &&
            "pb-8 border-b-1 !border-gray-500"
          }  grid-cols-[1fr_25%_25%_42px] items-center gap-4`}
        >
          <input type="hidden" {...register(`products.${index}.id`)} />
          <InputFormBuy
            register={register}
            label="Nombre del Producto"
            nameField={`products.${index}.name`}
            disabled={item.type !== "create"}
            placeholder="Nombre del Producto"
            type="text"
            options={{
              required: {
                value: true,
                message: "Este campo  es  requerido",
              },
              minLength: {
                value: 3,
                message: "Minimo 3  caractares",
              },
            }}
            error={errors.products && errors.products[index]?.name}
          />
          <InputFormBuy
            register={register}
            label="Precio en $"
            nameField={`products.${index}.price`}
            type="number"
            step="any"
            iconEnd={<LuDollarSign />}
            options={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              min: {
                value: 0.1,
                message: "Precio minimo 0.1",
              },
            }}
            error={errors.products && errors.products[index]?.price}
          />
          <InputFormBuy
            register={register}
            label="Cantidad"
            nameField={`products.${index}.stock`}
            type="number"
            iconEnd={<HiArchiveBox />}
            options={{
              required: {
                value: true,
                message: "Este campo es requerido",
              },
              min: {
                value: 1,
                message: "Cantidad minima  de 1",
              },
            }}
            error={errors.products && errors.products[index]?.stock}
          />
          <div className="mt-auto  flex items-center justify-center h-[42px]">
            <button
              className="flex transition-colors cursor-pointer duration-300 hover:bg-primary p-1 bg-gray-500 text-white rounded-lg items-center justify-center"
              onClick={() => removeField({ index, remove })}
            >
              <IoClose size={20} />
            </button>
          </div>
        </div>
      ))}
      <NotHaveProducts errors={errors} />
    </div>
  );
}
