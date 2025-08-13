import { MdDelete } from "react-icons/md";
import { LuDollarSign } from "react-icons/lu";
import InputFormBuy from "./inputFormBuy";
import { HiArchiveBox } from "react-icons/hi2";
import { changeSellingPrice, removeField } from "../utils";
import NotHaveProducts from "./notHaveProducts";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormBuyType } from "../types";
import SelectFormBuy from "./selectFormBuy";
import SelectMoneyType from "./selectMoneyType";

export default function BodyFormBuy({
  fields,
  register,
  errors,
  remove,
  pyDollar,
  setValue,
  getValues,
}: {
  fields: FieldArrayWithId<FormBuyType>[];
  register: UseFormRegister<FormBuyType>;
  errors: FieldErrors<FormBuyType>;
  remove: UseFieldArrayRemove;
  getValues: UseFormGetValues<FormBuyType>;
  setValue: UseFormSetValue<FormBuyType>;
  pyDollar: number;
}) {
  return (
    <div
      className={`container-fields gap-4 py-3  ${
        fields.length > 0 && "!pb-5"
      } flex flex-col`}
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          className={`grid ${
            fields.length > 0 &&
            index != fields.length - 1 &&
            "pb-8 border-b-1   !border-gray-500"
          }  md:grid-cols-[1fr_1fr_42px]
          lg:md:grid-cols-[1fr_1fr_1fr_42px]
          items-center gap-4`}
        >
          <input type="hidden" {...register(`products.${index}.id`)} />
          <div className="md:col-start-1 container-name">
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
          </div>
          <div className="md:col-start-2 lg:col-start-2 ">
            <SelectFormBuy
              pyDollar={pyDollar}
              selectOptions={[
                { title: "Individual", value: "individual" },
                { title: "Grupo", value: "group" },
              ]}
              index={index}
              getValues={getValues}
              setValue={setValue}
              register={register}
              options={{
                onChange: () =>
                  changeSellingPrice({ getValues, index, pyDollar, setValue }),
              }}
              label="Formato de precio"
              nameField={`products.${index}.buyType`}
              error={errors.products && errors.products[index]?.markup}
            />
          </div>
          <div className="md:col-start-1 container-price lg:col-start-3 ">
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
                  changeSellingPrice({ getValues, index, pyDollar, setValue }),
              }}
              error={errors.products && errors.products[index]?.price}
            />
          </div>
          <div className="md:col-start-2 container-stock lg:col-start-1">
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
          </div>
          <div className="md:col-start-1 lg:col-start-2 container-markup ">
            <SelectFormBuy
              selectOptions={[
                { title: "25%", value: 0.25 },
                { title: "30%", value: 0.3 },
                { title: "35%", value: 0.35 },
                { title: "40%", value: 0.4 },
                { title: "45%", value: 0.45 },
                { title: "50%", value: 0.5 },
              ]}
              index={index}
              getValues={getValues}
              setValue={setValue}
              register={register}
              label="Margen de Ganancia"
              nameField={`products.${index}.markup`}
              error={errors.products && errors.products[index]?.markup}
              options={{
                onChange: () =>
                  changeSellingPrice({ getValues, index, pyDollar, setValue }),
              }}
              pyDollar={pyDollar}
            />
          </div>
          <div className="container-selli-price md:col-start-2 lg:col-start-3 ">
            <InputFormBuy
              register={register}
              label="Precio de Venta"
              nameField={`products.${index}.sellingPrice`}
              type="number"
              disabled={true}
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
          <div className="md:col-start-3 justify-center lg:col-start-4 md:row-start-1 md:row-end-4 lg:row-end-3  flex items-center">
            <div className="mt-auto  flex items-center justify-center h-[42px]">
              <button
                className="transition-colors cursor-pointer duration-300 hover:text-primary hover:border-primary p-1 border-1 border-gray-500 text-gray-500 rounded-md "
                onClick={() => removeField({ index, remove })}
              >
                <MdDelete size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <NotHaveProducts errors={errors} />
    </div>
  );
}
