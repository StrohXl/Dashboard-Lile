import { IoClose } from "react-icons/io5";

import "react-responsive-modal/styles.css";
import {
  FieldErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { HiArchiveBox } from "react-icons/hi2";
import { Modal } from "react-responsive-modal";

import GroupRadio from "@/components/dashboard/form/groupRadio";
import InputForm from "@/components/dashboard/form/inputForm";
import SelectForm from "@/components/dashboard/form/selectForm";
import TypeOfCurrency from "@/components/dashboard/form/typeOfCurrency";

import { useContextBuy } from "../hooks/useContenxtBuy";
import { FormBuy } from "../models";
import { changeSellingPrice } from "../utilities";
import { useContextLayout } from "@/components/dashboard/hooks/ContextLayout";

export default function ModalCalculatePrice({
  register,
  errors,
  pyDollar,
  setValue,
  getValues,
  watch,
}: {
  register: UseFormRegister<FormBuy>;
  errors: FieldErrors<FormBuy>;
  getValues: UseFormGetValues<FormBuy>;
  setValue: UseFormSetValue<FormBuy>;
  pyDollar: number;
  watch: UseFormWatch<FormBuy>;
}) {
  const IVA = 16;
  const { openModal, setOpenModal, indexFields } = useContextBuy();

  const selectOptions = [
    { title: "20%", value: 0.2 },
    { title: "25%", value: 0.25 },
    { title: "30%", value: 0.3 },
    { title: "35%", value: 0.35 },
    { title: "40%", value: 0.4 },
    { title: "45%", value: 0.45 },
    { title: "50%", value: 0.5 },
  ];
  const idProduct = watch(`products.${indexFields}.id`);
  const sellingPrice = watch("selling_price");
  const typeOfCurrencyOfThePurchase = watch(
    `products.${indexFields}.type_of_currency_of_the_purchase`
  );
  const iva = watch(`products.${indexFields}.iva`);

  const addPrice = () => {
    const method = getValues("method");
    setValue(`products.${indexFields}.selling_price`, sellingPrice);

    if (method == "kg") {
      setValue(`products.${indexFields}.unit`, "kg");
    } else {
      setValue(`products.${indexFields}.unit`, "unit");
    }
    setValue("markup", 0.2);
    setValue("method", "unit");
    setOpenModal(false);

    setValue("selling_price", 0);
  };

  
  const unit = watch(`method`);
  
  const { theme } = useContextLayout();

  return (
    <Modal
      styles={{
        modal: {
          borderRadius: "10px",
          padding: 0,
        },
      }}
      center
      open={openModal}
      onClose={() => setOpenModal(false)}
      closeIcon={
        <IoClose
          data-theme={theme}
          className="text-gray-800 dark:text-white transition-colors hover:text-primary"
          size={25}
        />
      }
    >
      <div
        data-theme={theme}
        className="p-[1.2rem] bg-white dark:bg-gray-800 overflow-hidden rounded-lg"
      >
        <h2 className="font-roboto font-semibold mb-4 text-lg text-gray-800 dark:text-white">
          Calcular Precio
        </h2>
        <div>
          <div className="grid items-center mb-4 gap-4 md:grid-cols-[200px_200px]">
            <SelectForm<FormBuy>
              selectOptions={[
                { title: "Unidad", value: "unit" },
                { title: "Paquete", value: "package" },
                { title: "Kg", value: "kg" },
              ]}
              register={register}
              label="Metodo"
              nameField={`method`}
              options={{
                onChange: () =>
                  changeSellingPrice({
                    getValues,
                    index: indexFields,
                    pyDollar,
                    setValue,
                  }),
              }}
              error={errors.method}
            />
            <InputForm<FormBuy>
              register={register}
              label="Precio de compra"
              nameField={`products.${indexFields}.purchase_price`}
              type="number"
              step="any"
              iconEnd={
                <TypeOfCurrency
                  typeOfCurrency={typeOfCurrencyOfThePurchase}
                  onClickIcon={() => {
                    if (typeOfCurrencyOfThePurchase == "bs") {
                      setValue(
                        `products.${indexFields}.type_of_currency_of_the_purchase`,
                        "dollar"
                      );
                    } else {
                      setValue(
                        `products.${indexFields}.type_of_currency_of_the_purchase`,
                        "bs"
                      );
                    }
                    changeSellingPrice({
                      getValues,
                      index: indexFields,
                      pyDollar,
                      setValue,
                    });
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
                onChange: () =>
                  changeSellingPrice({
                    getValues,
                    index: indexFields,
                    pyDollar,
                    setValue,
                  }),
              }}
              error={errors.purchase_price}
            />

            <InputForm<FormBuy>
              register={register}
              label="Cantidad"
              nameField={`products.${indexFields}.stock`}
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
                onChange: () =>
                  changeSellingPrice({
                    index: indexFields,
                    getValues,
                    setValue,
                    pyDollar,
                  }),
              }}
              step={unit == "kg" ? "0.1" : "1"}
              error={errors.products && errors.products[indexFields]?.stock}
            />
            <SelectForm<FormBuy>
              selectOptions={selectOptions}
              register={register}
              label="Margen de Ganancia"
              nameField={`markup`}
              error={errors.markup}
              options={{
                onChange: () =>
                  changeSellingPrice({
                    getValues,
                    index: indexFields,
                    pyDollar,
                    setValue,
                  }),
              }}
            />
          </div>
          <GroupRadio<FormBuy>
            label="Incluir IVA de 16%"
            nameField={`products.${indexFields}.iva`}
            options={[
              { title: "Si", value: "true" },
              { title: "No", value: "false" },
            ]}
            register={register}
            setValue={setValue}
            disabled={idProduct == 0 ? false : true}
          />
          <label
            className={`font-roboto relative text-gray-700 dark:text-white block mt-4`}
          >
            <span className="flex items-center gap-2">
              Precio de venta en $:
              {iva == "true" ? (
                <span className="flex items-center gap-2">
                  <span className="line-through text-red-500 flex items-center">
                    {sellingPrice}$
                  </span>
                  <span className="flex items-center">
                    {(sellingPrice * Number(`0.${IVA}`) + sellingPrice).toFixed(
                      2
                    )}
                    $
                  </span>
                </span>
              ) : (
                `${sellingPrice}$`
              )}
            </span>
          </label>
          <label
            className={`font-roboto relative text-gray-700 dark:text-white block mt-2`}
          >
            <span className="flex items-center gap-2">
              Precio de venta en Bs:
              {iva == "true" ? (
                <span className="flex items-center gap-2">
                  <span className="line-through text-red-500 flex items-center">
                    {(sellingPrice * pyDollar).toFixed(2)}Bs
                  </span>
                  <span className="flex items-center">
                    {(
                      (sellingPrice * Number(`0.${IVA}`) + sellingPrice) *
                      pyDollar
                    ).toFixed(2)}
                    Bs
                  </span>
                </span>
              ) : (
                ` ${(sellingPrice * pyDollar).toFixed(2)}Bs`
              )}
            </span>
          </label>
        </div>
        <div className="mt-6 flex ">
          <button
            type="button"
            className="btn-primary  ms-auto"
            onClick={addPrice}
          >
            Agregar Precio
          </button>
        </div>
      </div>
    </Modal>
  );
}
