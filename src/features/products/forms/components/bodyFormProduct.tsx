import {
  FieldErrors,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import GroupRadio from "@/components/dashboard/form/groupRadio";
import InputForm from "@/components/dashboard/form/inputForm";
import LabelPriceAndPriceIva from "@/components/dashboard/form/labelPriceAndPriceIva";
import SelectForm from "@/components/dashboard/form/selectForm";
import TypeOfCurrency from "@/components/dashboard/form/typeOfCurrency";
import { changeCurrency } from "@/components/dashboard/form/utils/changeCurrency";

import { FormProduct } from "../models/form-product.model";

export default function BodyFormProduct({
  errors,
  register,
  dollar,
  setValue,
  watch,
  iva,
}: {
  dollar: number;
  errors: FieldErrors<FormProduct>;
  register: UseFormRegister<FormProduct>;
  setValue: UseFormSetValue<FormProduct>;
  watch: UseFormWatch<FormProduct>;
  iva: number;
}) {
  const inputIva = watch("iva");
  const price = Number(watch("price"));
  const priceIva = Number((price * Number(`0.${iva}`) + price).toFixed(2));
  const typeOfCurrency = watch("type_of_currency");
  const unit = watch("unit");

  return (
    <div className="body-form flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4">
        <InputForm<FormProduct>
          error={errors.name}
          label="Nombre del Producto"
          nameField="name"
          register={register}
          options={{
            required: "Este campo es requerido",
            minLength: {
              value: 3,
              message: "El nombre debe de tener minimo 3 caracteres",
            },
          }}
        />

        <div className="grid md:grid-cols-2 gap-4  2xl:grid-cols-1">
          <SelectForm<FormProduct>
            error={errors.unit}
            label="Tipo"
            nameField="unit"
            register={register}
            selectOptions={[
              { title: "Unidad", value: "unit" },
              { title: "Kg", value: "kg" },
            ]}
          />

          <InputForm<FormProduct>
            error={errors.stock}
            label="Cantidad"
            nameField="stock"
            defaultValue={0}
            register={register}
            placeholder="1"
            type="number"
            options={{
              required: "Este campo es requerido",
              min:
                unit == "kg"
                  ? {
                      value: 0,
                      message: "La cantidad debe de ser  minimo 0",
                    }
                  : {
                      value: 1,
                      message: "La cantidad debe de ser  minimo 1",
                    },
            }}
            step={unit == "kg" ? "any" : "1"}
          />
        </div>
        <GroupRadio<FormProduct>
          nameField="iva"
          label="Incluir IVA de 16%"
          options={[
            { title: "Si", value: "true" },
            { title: "No", value: "false" },
          ]}
          register={register}
          setValue={setValue}
        />
        <InputForm<FormProduct>
          error={errors.price}
          nameField="price"
          register={register}
          placeholder="1"
          step="any"
          type="number"
          label="Precio de Venta"
          labelTheLast={
            <LabelPriceAndPriceIva
              inputIva={inputIva}
              price={price}
              priceIva={priceIva}
              typeOfCurrency={typeOfCurrency}
            />
          }
          defaultValue={0}
          options={{
            required: "Este campo es requerido",
            min: {
              value: 0.1,
              message: "La cantidad debe de ser  minimo 0.1",
            },
          }}
          iconEnd={
            <TypeOfCurrency
              typeOfCurrency={typeOfCurrency}
              onClickIcon={() =>
                changeCurrency({
                  dollar,
                  price,
                  setValue,
                  typeOfCurrency,
                  nameFieldCurrency: "type_of_currency",
                  nameFieldPrice: "price",
                })
              }
            />
          }
        />
      </div>
    </div>
  );
}
