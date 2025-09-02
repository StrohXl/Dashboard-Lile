import { IoClose } from "react-icons/io5";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { FormSale } from "@/features/sales/form/models";
import { useContextSale } from "@/features/sales/form/hooks/saleHookContext";
import { SelectSaleForm } from "../../../selectFormSale";
import InputSaleForm from "../../../inputFormSale";

export default function ListChangesBodyFormSale({
  fields,
  register,
  errors,
  remove,
  watch,
  getValues,
}: {
  fields: FieldArrayWithId<FormSale, "change_manager">[];
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  remove: UseFieldArrayRemove;
  getValues: UseFormGetValues<FormSale>;
  watch: UseFormWatch<FormSale>;
}) {
  const { setTotalChanges, dollar } = useContextSale();

  const calculateChanges = () => {
    const changeManager = getValues("change_manager");
    const totalPayments = changeManager.reduce(
      (accumulator, item) =>
        accumulator +
        (item.payment_method == "divisa"
          ? Number(item.payment_amount)
          : Number(item.payment_amount) / dollar),
      0
    );
    setTotalChanges(Number(totalPayments));
  };

  return (
    <div
      className={`container-fields gap-4 pt-3  ${
        fields.length > 0 && ""
      } flex flex-col`}
    >
      <div
        className={`grid  sm:grid-cols-[1fr_120px_120px_28px] items-center gap-4
           `}
      >
        <h6 className="font-roboto text-gray-600 font-semibold">
          Metodo de Pago
        </h6>
        <h6 className="font-roboto text-gray-600 font-semibold">Monto</h6>
        <h6 className="font-roboto text-gray-600 font-semibold">Operacion</h6>
      </div>
      {fields.map((payment, index) => (
        <div
          key={payment.id}
          className={`grid sm:grid-cols-[1fr_120px_120px_28px] items-center gap-4
           `}
        >
          <SelectSaleForm
            error={
              errors.change_manager &&
              errors.change_manager[index]?.payment_method
            }
            register={register}
            nameField={`change_manager.${index}.payment_method`}
            selectOptions={[
              { title: "Transferencia", value: "transferencia" },
              { title: "Divisa", value: "divisa" },
              { title: "Efectivo Bs", value: "efectivo Bs" },
            ]}
            options={{
              onChange: calculateChanges,
            }}
          />
          <InputSaleForm
            nameField={`change_manager.${index}.payment_amount`}
            register={register}
            type="number"
            hiddenMessageError={true}
            error={
              errors.change_manager &&
              errors.change_manager[index]?.payment_amount
            }
            options={{
              required: {
                message: "requerido",
                value: true,
              },
              min: {
                value: 1,
                message: "",
              },
              onChange: calculateChanges,
            }}
            step="any"
          />
          <InputSaleForm
            nameField={`change_manager.${index}.operation`}
            register={register}
            type="number"
            hiddenMessageError={true}
            disabled={
              watch(`change_manager.${index}.payment_method`) != "transferencia"
            }
            error={
              errors.change_manager && errors.change_manager[index]?.operation
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
          />

          <button
            className="transition-colors cursor-pointer duration-300 hover:!text-red-500 p-[2px] text-gray-500"
            onClick={() => {
              remove(index);
              calculateChanges();
            }}
          >
            <IoClose size={22} />
          </button>
        </div>
      ))}
    </div>
  );
}
