import { LuDollarSign } from "react-icons/lu";
import InputFormBuy from "./inputFormBuy";
import { HiArchiveBox } from "react-icons/hi2";
import { removeField } from "../utils";
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
      className={`container-fields gap-4 flex flex-col  ${
        fields.length > 0 && "mb-4"
      }`}
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className="grid border-b-1 pb-8 border-gray-400 grid-cols-[1fr_25%_25%_20px] items-center gap-4"
        >
          <input type="hidden" {...register(`products.${index}.id`)} />
          <InputFormBuy
            register={register}
            label="Nombre del Producto"
            nameField={`products.${index}.name`}
            disabled={item.type !== "create"}
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
            step="any"
            iconEnd={<HiArchiveBox />}
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
            error={errors.products && errors.products[index]?.stock}
          />
          <button onClick={() => removeField({ index, remove })}>x</button>
        </div>
      ))}
      <NotHaveProducts errors={errors} />
    </div>
  );
}
