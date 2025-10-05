import {
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FormSale } from "../../../models";
import { OptionList } from "../models/optionList.model";
import ContainerActions from "./containerActions";
import { updateTotalChanges, updateTotalPayments } from "../utils";
import { useContextSale } from "../../../hooks/saleHookContext";
import onChangeSelect from "../utils/onChangeSelect";
import InputForm from "@/components/dashboard/form/inputForm";
import SelectForm from "@/components/dashboard/form/selectForm";

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

  const { dollar, setTotalPayments, setTotalChanges, totalPrice } =
    useContextSale();

  const selectOptions =
    option == "payments"
      ? [
          { title: "Transferencia", value: "transferencia" },
          { title: "Divisa", value: "divisa" },
          { title: "Efectivo Bs", value: "efectivo Bs" },
          { title: "Biopago", value: "biopago" },
        ]
      : [
          { title: "Transferencia", value: "transferencia" },
          { title: "Divisa", value: "divisa" },
          { title: "Efectivo Bs", value: "efectivo Bs" },
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
          onChange: (event) =>
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
            }),
        }}
      />

      <InputForm<FormSale>
        nameField={
          option == "payments"
            ? `payments.${index}.payment_amount`
            : `change_manager.${index}.change_amount`
        }
        register={register}
        type={'number'}
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
            ? watch(`payments.${index}.payment_method`) == "transferencia"
              ? "number"
              : "hidden"
            : watch(`change_manager.${index}.change_method`) == "transferencia"
            ? "number"
            : "hidden"
        }
        error={
          option == "payments"
            ? errorPayments?.operation
            : errorChanges?.operation
        }
        options={{
          required: {
            message: "requerido",
            value: true,
          },
          minLength: {
            value: 4,
            message: "minimo 4",
          },
          maxLength: {
            value: 4,
            message: "maximo 4",
          },
        }}
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
