import {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import InputForm from "@/components/dashboard/form/inputForm";
import SelectForm from "@/components/dashboard/form/selectForm";

import { useContextSale } from "../../../hooks/saleHookContext";
import { FormSale } from "../../../models";
import { OptionList } from "../models/optionList.model";
import { updateTotalChanges, updateTotalPayments } from "../utils";
import onChangeSelect from "../utils/onChangeSelect";
import ContainerActions from "./containerActions";

export default function ListBody({
  errors,
  getValues,
  register,
  watch,
  option,
  remove,
  index,
  setValue,
}: {
  remove: UseFieldArrayRemove;
  option: OptionList;
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  watch: UseFormWatch<FormSale>;
  getValues: UseFormGetValues<FormSale>;
  setValue: UseFormSetValue<FormSale>;
  index: number;
}) {
  const idField: `payments.${number}.id` | `change_manager.${number}.id` = `${
    option == "payments" ? `payments` : `change_manager`
  }.${index}.id`;

  const errorPayments = errors.payments && errors.payments[index];
  const errorChanges = errors.change_manager && errors.change_manager[index];
  const paymentMethod = watch(`payments.${index}.payment_method`);
  const changeMethod = watch(`change_manager.${index}.change_method`);
  const { dollar, setTotalPayments, setTotalChanges, totalPrice } =
    useContextSale();

  const selectOptions =
    option == "payments"
      ? [
          { title: "Transferencia", value: "transferencia" },
          { title: "Divisa", value: "divisa" },
          { title: "Efectivo Bs", value: "efectivoBs" },
          { title: "Biopago", value: "biopago" },
        ]
      : [
          { title: "Transferencia", value: "transferencia" },
          { title: "Divisa", value: "divisa" },
          { title: "Efectivo Bs", value: "efectivoBs" },
        ];

  return (
    <>
      <input type="hidden" {...register(idField)} />

      <SelectForm<FormSale>
        error={
          option == "payments"
            ? errorPayments?.payment_method
            : errorChanges?.change_method
        }
        register={register}
        nameField={
          option == "payments"
            ? `payments.${index}.payment_method`
            : `change_manager.${index}.change_method`
        }
        selectOptions={selectOptions}
        options={{
          onChange: (event) => {
            if (event.target.value != "transferencia" && option == "payments") {
              setValue(`payments.${index}.operation`, Number(`0000`));
            } else if (
              event.target.value != "transferencia" &&
              option == "changes"
            ) {
              setValue(`change_manager.${index}.operation`, undefined);
            }
            onChangeSelect({
              dollar,
              getValues,
              index,
              option,
              setTotalPayments,
              setValue,
              totalPrice,
              value: event.target.value,
              setTotalChanges,
            });
          },
        }}
      />

      <InputForm<FormSale>
        nameField={
          option == "payments"
            ? `payments.${index}.payment_amount`
            : `change_manager.${index}.change_amount`
        }
        register={register}
        type={"number"}
        error={
          option == "payments"
            ? errorPayments?.payment_amount
            : errorChanges?.change_amount
        }
        options={{
          required: {
            message: "requerido",
            value: true,
          },
          min: {
            value: 0,
            message: "",
          },
          pattern: {
            value: /\d+/,
            message: "Solo numeros",
          },
          onChange: () => {
            if (option == "payments") {
              updateTotalPayments({
                dollar,
                getValues,
                setTotalPayments,
              });
            } else {
              updateTotalChanges({ dollar, getValues, setTotalChanges });
            }
          },
        }}
        step="any"
        messageError={false}
      />
      {}
      <InputForm<FormSale>
        nameField={
          option == "payments"
            ? `payments.${index}.operation`
            : `change_manager.${index}.operation`
        }
        register={register}
        type={
          option == "payments"
            ? paymentMethod == "transferencia"
              ? "number"
              : "hidden"
            : changeMethod == "transferencia"
              ? "number"
              : "hidden"
        }
        error={
          option == "payments"
            ? errorPayments?.operation
            : errorChanges?.operation
        }
        options={
          paymentMethod == "transferencia"
            ? {
                required: {
                  message: "requerido",
                  value: true,
                },
                minLength: {
                  value: 4,
                  message: "minimo 4",
                },
                pattern: {
                  value: /\d+/,
                  message: "Solo numeros",
                },
              }
            : undefined
        }
        messageError={false}
      />

      <ContainerActions
        getValues={getValues}
        index={index}
        option={option}
        remove={remove}
        watch={watch}
      />
    </>
  );
}
