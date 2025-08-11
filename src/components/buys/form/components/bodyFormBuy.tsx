import { LuDollarSign } from "react-icons/lu";
import InputFormBuy from "./inputFormBuy";
import { HiArchiveBox } from "react-icons/hi2";
import {
  changeSellingPrice,
  removeField,
  updatePrice,
  updatePriceBs,
} from "../utils";
import { IoClose } from "react-icons/io5";
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
  pyDollar: number | undefined;
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
           xl:grid-cols-[250px_120px_130px_130px_170px_135px_42px]
          
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
          <div className="md:col-start-2 container-stock">
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
                  }),
              }}
              error={errors.products && errors.products[index]?.stock}
            />
          </div>
          <div className="md:col-start-1 container-price lg:col-start-3">
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
                onChange: (item) =>
                  updatePriceBs({
                    index,
                    value: item.target.value,
                    getValues,
                    pyDollar,
                    setValue,
                  }),
              }}
              error={errors.products && errors.products[index]?.price}
            />
          </div>
          <div className="md:col-start-2  lg:col-start-1 container-price-bs xl:col-auto">
            <InputFormBuy
              register={register}
              label="Precio en Bs"
              nameField={`products.${index}.priceBs`}
              type="number"
              step="any"
              iconEnd={<span>Bs</span>}
              options={{
                required: {
                  value: true,
                  message: "Este campo es requerido",
                },
                min: {
                  value: 0.1,
                  message: "Precio minimo 0.1",
                },
                onChange: (item) =>
                  updatePrice({
                    index,
                    value: item.target.value,
                    getValues,
                    pyDollar,
                    setValue,
                  }),
              }}
              error={errors.products && errors.products[index]?.priceBs}
            />
          </div>
          <div className="md:col-start-1 lg:col-start-2 container-markup xl:col-auto">
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
            />
          </div>
          <div className="container-selli-price md:col-start-2 lg:col-start-3 xl:col-auto">
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
                  value: 1,
                  message: "Cantidad minima  de 1",
                },
              }}
              error={errors.products && errors.products[index]?.sellingPrice}
            />
          </div>
          <div className="md:col-start-3 xl:mt-auto justify-center lg:col-start-4 md:row-start-1 md:row-end-4 lg:row-end-3   xl:col-auto xl:row-auto  flex items-center">
            <div className="mt-auto  flex items-center justify-center h-[42px]">
              <button
                className="flex transition-colors cursor-pointer duration-300 hover:bg-primary p-1 bg-gray-500 text-white rounded-lg items-center justify-center"
                onClick={() => removeField({ index, remove })}
              >
                <IoClose size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
      <NotHaveProducts errors={errors} />
    </div>
  );
}
