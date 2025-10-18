import { UseFormReturn } from "react-hook-form";
import HeaderList from "../components/HeaderList";
import { OptionList } from "../models/optionList.model";
import { prependChange, updateTotalChanges } from "../utils";
import { FormSale } from "../../../models";
import { useContextSale } from "../../../hooks/saleHookContext";
import HeaderListBody from "../components/HeaderListBody";
import { useFieldArray } from "react-hook-form";
import InputForm from "@/components/dashboard/form/inputForm";
import SelectForm from "@/components/dashboard/form/selectForm";
import onChangeSelect from "../utils/onChangeSelect";
import ContainerActions from "../components/containerActions";
import FooterChanges from "../components/footerChanges";

export default function ListChanges({
  option,
  useFormSale,
}: {
  option: OptionList;
  useFormSale: UseFormReturn<FormSale>;
}) {
  const {
    register,
    setValue,
    getValues,
    control,
    watch,
    formState: { errors },
  } = useFormSale;

  const { fields, prepend, remove } = useFieldArray({
    name: "change_manager",
    control,
  });

  const contextSale = useContextSale();
  const { dollar, totalPrice, totalChanges, setTotalChanges, totalPayments } =
    contextSale;

  const onClickAdded = () => {
    prependChange({
      prepend,
      dollar,
      totalChanges,
      totalPayments,
      totalPrice,
    });
    setTimeout(
      () => updateTotalChanges({ dollar, getValues, setTotalChanges }),
      200
    );
  };

  const selectOptions = [
    { title: "Transferencia", value: "transferencia" },
    { title: "Divisa", value: "divisa" },
    { title: "Efectivo Bs", value: "efectivoBs" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <HeaderList title="Cambios" buttonAdded={onClickAdded} />

      <div className={`container-fields gap-4 pt-3 flex flex-col`}>
        <HeaderListBody />

        {fields.map((item, index) => {
          const changeMethod = watch(`change_manager.${index}.change_method`);
          const idChange = watch(`change_manager.${index}.id`);
          return (
            <div
              key={item.id}
              className={`grid sm:grid-cols-[1fr_90px_90px_100px] items-center gap-4`}
            >
              <input
                type="hidden"
                {...register(`change_manager.${index}.id`)}
              />
              <SelectForm<FormSale>
                register={register}
                nameField={`change_manager.${index}.change_method`}
                selectOptions={selectOptions}
                options={{
                  onChange: (event) => {
                    const value = event.target.value;
                    if (value != "transferencia") {
                      setValue(
                        `change_manager.${index}.operation`,
                        Number(`0000`)
                      );
                    } else {
                      setValue(`change_manager.${index}.operation`, undefined);
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
                disabled={idChange !== 0}
              />
              <InputForm<FormSale>
                nameField={`change_manager.${index}.change_amount`}
                register={register}
                type={"number"}
                error={
                  errors.change_manager &&
                  errors.change_manager[index]?.change_amount
                }
                options={{
                  required: true,
                  min: 0,
                  pattern: /\d+/,
                  onChange: () =>
                    updateTotalChanges({ dollar, getValues, setTotalChanges }),
                }}
                step="any"
                messageError={false}
                disabled={idChange !== 0}

              />
              <InputForm<FormSale>
                nameField={`change_manager.${index}.operation`}
                register={register}
                type={changeMethod == "transferencia" ? "number" : "hidden"}
                error={
                  errors.change_manager &&
                  errors.change_manager[index]?.operation
                }
                options={{
                  required: true,
                  minLength: 4,
                  pattern: /\d+/,
                }}
                messageError={false}
                disabled={idChange !== 0}
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

      <FooterChanges />
    </div>
  );
}
