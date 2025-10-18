import { useFieldArray, UseFormReturn } from "react-hook-form";

import InputForm from "@/components/dashboard/form/inputForm";
import SelectForm from "@/components/dashboard/form/selectForm";

import { useContextSale } from "../../../hooks/saleHookContext";
import { FormSale } from "../../../models";
import ContainerActions from "../components/containerActions";
import FooterPayments from "../components/footerPayments";
import HeaderList from "../components/HeaderList";
import HeaderListBody from "../components/HeaderListBody";
import { OptionList } from "../models/optionList.model";
import { prependPayment, updateTotalPayments } from "../utils";
import onChangeSelect from "../utils/onChangeSelect";

export default function ListPayments({
  option,
  useFormSale,
}: {
  option: OptionList;
  useFormSale: UseFormReturn<FormSale>;
}) {
  const {
    getValues,
    control,
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormSale;

  const { fields, prepend, remove } = useFieldArray({
    name: "payments",
    control,
  });

  const contextSale = useContextSale();
  const { dollar, totalPrice, setTotalPayments, totalPayments } = contextSale;

  const onClickAdded = () => {
    prependPayment({ prepend, dollar, totalPayments, totalPrice });
    setTimeout(
      () => updateTotalPayments({ dollar, getValues, setTotalPayments }),
      200
    );
  };

  const selectOptions = [
    { title: "Transferencia", value: "transferencia" },
    { title: "Divisa", value: "divisa" },
    { title: "Efectivo Bs", value: "efectivoBs" },
    { title: "Biopago", value: "biopago" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <HeaderList title="Pagos" buttonAdded={onClickAdded} />

      <div className={`container-fields gap-4 pt-3 flex flex-col`}>
        <HeaderListBody />

        {fields.map((item, index) => {
          const paymentMethod = watch(`payments.${index}.payment_method`);
          const idPayment = watch(`payments.${index}.id`);
          return (
            <div
              key={item.id}
              className={`grid sm:grid-cols-[1fr_90px_90px_100px] items-center gap-4`}
            >
              <input type="hidden" {...register(`payments.${index}.id`)} />
              <SelectForm<FormSale>
                register={register}
                nameField={`payments.${index}.payment_method`}
                selectOptions={selectOptions}
                options={{
                  onChange: (event) => {
                    const value = event.target.value;
                    if (value != "transferencia") {
                      setValue(`payments.${index}.operation`, Number(`0000`));
                    } else {
                      setValue(`payments.${index}.operation`, undefined);
                    }
                    onChangeSelect({
                      index,
                      option,
                      value,
                      contextSale,
                      useFormSale,
                    });
                  },
                }}
                disabled={idPayment != 0}
              />
              <InputForm<FormSale>
                nameField={`payments.${index}.payment_amount`}
                register={register}
                type={"number"}
                error={
                  errors.payments && errors.payments[index]?.payment_amount
                }
                options={{
                  required: true,
                  min: 0,
                  pattern: /\d+/,
                  onChange: () =>
                    updateTotalPayments({
                      dollar,
                      getValues,
                      setTotalPayments,
                    }),
                }}
                step="any"
                messageError={false}
                disabled={idPayment != 0}
              />
              <InputForm<FormSale>
                nameField={`payments.${index}.operation`}
                register={register}
                type={paymentMethod == "transferencia" ? "number" : "hidden"}
                error={errors.payments && errors.payments[index]?.operation}
                options={{
                  required: true,
                  minLength: 4,
                  pattern: /\d+/,
                }}
                messageError={false}
                disabled={idPayment != 0}
              />
              <ContainerActions
                getValues={getValues}
                index={index}
                option={option}
                remove={remove}
                watch={watch}
              />
            </div>
          );
        })}
      </div>

      <FooterPayments />
    </div>
  );
}
