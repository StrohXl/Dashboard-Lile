import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { HiArchiveBox } from "react-icons/hi2";

import GroupRadio from "@/components/dashboard/form/groupRadio";
import InputForm from "@/components/dashboard/form/inputForm";
import LabelPriceAndPriceIva from "@/components/dashboard/form/labelPriceAndPriceIva";
import SelectForm from "@/components/dashboard/form/selectForm";
import TypeOfCurrency from "@/components/dashboard/form/typeOfCurrency";
import { changeCurrency } from "@/components/dashboard/form/utils/changeCurrency";

import { FormBuy } from "../models";
import MenuOptions from "./menuOptions";
import NotHaveProducts from "./notHaveProducts";

export default function BodyFormBuy({
  fields,
  register,
  errors,
  remove,
  pyDollar,
  setValue,
  getValues,
  watch,
  IVA,
}: {
  fields: FieldArrayWithId<FormBuy>[];
  register: UseFormRegister<FormBuy>;
  errors: FieldErrors<FormBuy>;
  remove: UseFieldArrayRemove;
  getValues: UseFormGetValues<FormBuy>;
  setValue: UseFormSetValue<FormBuy>;
  pyDollar: number;
  watch: UseFormWatch<FormBuy>;
  IVA: number;
}) {
  return (
    <div
      className={`container-fields gap-4 py-3  ${
        fields.length > 0 && "!pb-5"
      } flex flex-col`}
    >
      {fields.map((item, index) => {
        const idProduct = watch(`products.${index}.id`);
        const unit = watch(`products.${index}.unit`);
        const inputIva = watch(`products.${index}.iva`);
        const price = Number(watch(`products.${index}.selling_price`));
        const priceIva = Number(
          (price * Number(`0.${IVA}`) + price).toFixed(2)
        );
        const typeOfCurrencyForSale = watch(
          `products.${index}.type_of_currency_for_sale`
        );
        const typeOfCurrencyOfThePurchase = watch(
          `products.${index}.type_of_currency_of_the_purchase`
        );
        return (
          <div
            key={item.id}
            className={`${
              fields.length > 0 &&
              index != fields.length - 1 &&
              "pb-8 border-b-1  !border-gray-500"
            } `}
          >
            <div className="flex justify-end mb-2">
              <MenuOptions
                id={idProduct}
                getValues={getValues}
                index={index}
                remove={remove}
                setValue={setValue}
              />
            </div>
            <div
              className={`grid sm:grid-cols-[1fr_1fr] md:grid-cols-[1fr_150px_300px] items-center gap-4
           `}
            >
              <input type="hidden" {...register(`products.${index}.id`)} />
              <InputForm<FormBuy>
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
              <SelectForm<FormBuy>
                register={register}
                label="Tipo"
                nameField={`products.${index}.unit`}
                disabled={idProduct == 0 ? false : true}
                selectOptions={[
                  { title: "Unidad", value: "unit" },
                  { title: "Kg", value: "kg" },
                ]}
                error={errors.products && errors.products[index]?.unit}
              />
              <InputForm<FormBuy>
                register={register}
                label="Precio de compra"
                nameField={`products.${index}.purchase_price`}
                type="number"
                step="any"
                iconEnd={
                  <TypeOfCurrency
                    typeOfCurrency={typeOfCurrencyOfThePurchase}
                    onClickIcon={() => {
                      if (typeOfCurrencyOfThePurchase == "bs") {
                        setValue(
                          `products.${index}.type_of_currency_of_the_purchase`,
                          "dollar"
                        );
                      } else {
                        setValue(
                          `products.${index}.type_of_currency_of_the_purchase`,
                          "bs"
                        );
                      }
                    }}
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
                }}
                error={
                  errors.products && errors.products[index]?.purchase_price
                }
              />
              <GroupRadio<FormBuy>
                label="Incluir IVA de 16%"
                nameField={`products.${index}.iva`}
                options={[
                  { title: "Si", value: "true" },
                  { title: "No", value: "false" },
                ]}
                register={register}
                setValue={setValue}
                disabled={idProduct == 0 ? false : true}
              />
              <InputForm<FormBuy>
                register={register}
                label="Cantidad"
                nameField={`products.${index}.stock`}
                type="number"
                iconEnd={unit == "kg" ? "Kg" : <HiArchiveBox />}
                options={{
                  required: {
                    value: true,
                    message: "Este campo es requerido",
                  },
                  min: {
                    value: unit == "kg" ? 0 : 1,
                    message: "Cantidad minima  de 1",
                  },
                }}
                step={unit == "kg" ? "any" : "1"}
                error={errors.products && errors.products[index]?.stock}
              />
              <InputForm<FormBuy>
                register={register}
                label="Precio de Venta"
                nameField={`products.${index}.selling_price`}
                type="number"
                iconEnd={
                  <TypeOfCurrency
                    typeOfCurrency={typeOfCurrencyForSale}
                    onClickIcon={() =>
                      changeCurrency({
                        dollar: pyDollar,
                        price,
                        setValue,
                        typeOfCurrency: typeOfCurrencyForSale,
                        nameFieldCurrency: `products.${index}.type_of_currency_for_sale`,
                        nameFieldPrice: `products.${index}.selling_price`,
                      })
                    }
                  />
                }
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
                step="any"
                labelTheLast={
                  <LabelPriceAndPriceIva
                    inputIva={inputIva}
                    price={price}
                    priceIva={priceIva}
                    typeOfCurrency={typeOfCurrencyForSale}
                  />
                }
                error={errors.products && errors.products[index]?.selling_price}
              />
            </div>
          </div>
        );
      })}
      <NotHaveProducts errors={errors} />
    </div>
  );
}
