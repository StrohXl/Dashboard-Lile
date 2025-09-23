import { IoClose } from "react-icons/io5";
import { LuDollarSign } from "react-icons/lu";
import InputFormBuy from "./inputFormBuy";
import { HiArchiveBox } from "react-icons/hi2";
import NotHaveProducts from "./notHaveProducts";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import SelectMoneyType from "./selectMoneyType";
import { changeSellingPrice } from "../utilities";
import { FormBuy } from "../models";

export default function BodyFormBuy({
  fields,
  register,
  errors,
  remove,
  pyDollar,
  setValue,
  getValues,
  watch,
}: {
  fields: FieldArrayWithId<FormBuy>[];
  register: UseFormRegister<FormBuy>;
  errors: FieldErrors<FormBuy>;
  remove: UseFieldArrayRemove;
  getValues: UseFormGetValues<FormBuy>;
  setValue: UseFormSetValue<FormBuy>;
  pyDollar: number;
  watch: UseFormWatch<FormBuy>;
}) {
  return (
    <div
      className={`container-fields gap-4 py-3  ${
        fields.length > 0 && "!pb-5"
      } flex flex-col`}
    >
      {fields.map((item, index) => {
        const idProduct = watch(`products.${index}.id`);
        return (
          <div
            key={item.id}
            className={`${
              fields.length > 0 &&
              index != fields.length - 1 &&
              "pb-8 border-b-1 mb-5   !border-gray-500"
            } `}
          >
            <div className="flex justify-end mb-4">
              <button
                className="transition-colors cursor-pointer duration-300 hover:text-primary hover:border-primary p-[2px] border-1 border-gray-500 text-gray-500 rounded-[5px] "
                onClick={() => remove(index)}
              >
                <IoClose size={22} />
              </button>
            </div>
            <div
              className={`grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_150px_150px_150px] items-center gap-4
           `}
            >
              <input type="hidden" {...register(`products.${index}.id`)} />
              <InputFormBuy
                register={register}
                label="Nombre del Producto"
                nameField={`products.${index}.name`}
                disabled={idProduct == 0 ? false : true}
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
                label="Precio de compra"
                nameField={`products.${index}.price`}
                type="number"
                step="any"
                iconEnd={
                  <SelectMoneyType
                    getValues={getValues}
                    index={index}
                    pyDollar={pyDollar}
                    register={register}
                    setValue={setValue}
                  />
                }
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  min: {
                    value: 0.1,
                    message: "Precio minimo 0.1",
                  },
                  onChange: () =>
                    changeSellingPrice({
                      getValues,
                      index,
                      pyDollar,
                      setValue,
                    }),
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
                  onChange: () =>
                    changeSellingPrice({
                      index,
                      getValues,
                      setValue,
                      pyDollar,
                    }),
                }}
                error={errors.products && errors.products[index]?.stock}
              />
              <InputFormBuy
                register={register}
                label="Precio de Venta"
                nameField={`products.${index}.sellingPrice`}
                type="number"
                iconEnd={<LuDollarSign />}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  min: {
                    value: 0.1,
                    message: "Cantidad minima  de 0.1",
                  },
                }}
                error={errors.products && errors.products[index]?.sellingPrice}
              />
            </div>
          </div>
        );
      })}
      <NotHaveProducts errors={errors} />
    </div>
  );
}
