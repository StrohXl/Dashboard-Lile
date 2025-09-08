import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayPrepend,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { FormSale } from "../../models";
import { OptionList } from "./models/optionList.model";
import { useContextSale } from "../../hooks/saleHookContext";
import { SelectSaleForm } from "../selectFormSale";
import InputSaleForm from "../inputFormSale";
import { calculateChanges } from "./utils/calculateChanges";
import { IoClose } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import { deletePayment } from "./services/deletePayment.service";
import { calculatePayments, prependChange, prependPayment } from "./utils";

export default function ListPaymentsAndChanges({
  errors,
  getValues,
  register,
  watch,
  option,
  prepend,
  fields,
  remove,
}: {
  remove: UseFieldArrayRemove;
  fields: FieldArrayWithId<FormSale>[];
  prepend: UseFieldArrayPrepend<FormSale>;
  option: OptionList;
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  watch: UseFormWatch<FormSale>;
  getValues: UseFormGetValues<FormSale>;
}) {
  const {
    totalPayments,
    dollar,
    totalPrice,
    totalChanges,
    setTotalPayments,
    setTotalChanges,
    disabled,
    setDisabled,
  } = useContextSale();

  const totalDebt = totalPayments - totalPrice;
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h4 className="font-roboto text-gray-800 font-semibold text-lg">
          {option == "payments" ? "Pagos" : "Cambios"}
        </h4>
        <button
          onClick={() => {
            if (option == "payments") {
              prependPayment({ prepend });
            } else {
              prependChange({ prepend });
            }
          }}
          className="btn-outlined-primary"
          type="button"
        >
          Agregar
        </button>
      </div>

      <div className={`container-fields gap-4 pt-3 flex flex-col`}>
        <div
          className={`grid  sm:grid-cols-[1fr_90px_90px_100px] items-center gap-4
                 `}
        >
          <h6 className="font-roboto text-gray-600 font-semibold">Metodo</h6>
          <h6 className="font-roboto text-gray-600 font-semibold">Monto</h6>
          <h6 className="font-roboto text-gray-600 font-semibold">Operacion</h6>
          <h6 className="font-roboto text-gray-600 font-semibold text-center">
            Acciones
          </h6>
        </div>

        {fields.map((payment, index) => (
          <div
            key={payment.id}
            className={`grid sm:grid-cols-[1fr_90px_90px_100px] items-center gap-4
                 `}
          >
            <input
              type="hidden"
              {...register(
                `${
                  option == "payments" ? "payments" : "change_manager"
                }.${index}.id`
              )}
            />

            <SelectSaleForm
              error={
                option == "payments"
                  ? errors.payments && errors.payments[index]?.payment_method
                  : errors.change_manager &&
                    errors.change_manager[index]?.change_method
              }
              register={register}
              nameField={
                option == "payments"
                  ? `payments.${index}.payment_method`
                  : `change_manager.${index}.change_method`
              }
              selectOptions={[
                { title: "Transferencia", value: "transferencia" },
                { title: "Divisa", value: "divisa" },
                { title: "Efectivo Bs", value: "efectivo Bs" },
              ]}
              options={{
                onChange: () => {
                  if (option == "payments") {
                    calculatePayments({ dollar, getValues, setTotalPayments });
                  } else {
                    calculateChanges({ dollar, getValues, setTotalChanges });
                  }
                },
              }}
            />

            <InputSaleForm
              nameField={
                option == "payments"
                  ? `payments.${index}.payment_amount`
                  : `change_manager.${index}.change_amount`
              }
              register={register}
              type="number"
              hiddenMessageError={true}
              error={
                option == "payments"
                  ? errors.payments && errors.payments[index]?.payment_amount
                  : errors.change_manager &&
                    errors.change_manager[index]?.change_amount
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
                    calculatePayments({ dollar, getValues, setTotalPayments });
                  } else {
                    calculateChanges({ dollar, getValues, setTotalChanges });
                  }
                },
              }}
              step="any"
            />

            <InputSaleForm
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
                  : watch(`change_manager.${index}.change_method`) ==
                    "transferencia"
                  ? "number"
                  : "hidden"
              }
              hiddenMessageError={true}
              error={
                option == "payments"
                  ? errors.payments && errors.payments[index]?.operation
                  : errors.change_manager &&
                    errors.change_manager[index]?.operation
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

            <div className="container-actions flex justify-center gap-4 items-center">
              {watch(
                `${
                  option == "payments" ? "payments" : "change_manager"
                }.${index}.id`
              ) == 0 ? (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => {
                    remove(index);
                    if (option == "payments") {
                      calculatePayments({
                        dollar,
                        getValues,
                        setTotalPayments,
                      });
                    } else {
                      calculateChanges({
                        dollar,
                        getValues,
                        setTotalChanges,
                      });
                    }
                  }}
                >
                  <IoClose size={22} />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    deletePayment({
                      dollar,
                      getValues,
                      id: Number(watch(`payments.${index}.id`)),
                      remove,
                      index,
                      setTotalPayments,
                      setDisabled,
                    })
                  }
                >
                  <MdDelete size={22} />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {option == "payments" && (
        <div className="mt-auto">
          <div className="grid mt-4 grid-cols-[130px_1fr] items-center gap-4">
            <h6 className="font-roboto text-gray-600 font-semibold">
              Pagos totales:
            </h6>
            <div className="font-roboto text-gray-700 font-semibold grid grid-cols-2 items-center">
              <span className="ms-auto pe-4 block">
                {totalPayments.toFixed(2)}$
              </span>
              <span className="border-l-1 border-gray-400 ps-4 block">
                {(totalPayments * dollar).toFixed(2)}Bs
              </span>
            </div>
          </div>
          <div className="grid mt-2 grid-cols-[130px_1fr] items-center gap-4">
            <h6 className="font-roboto text-gray-600 font-semibold">
              Monto Faltante:
            </h6>
            <div
              className={`font-roboto text-green-600 ${
                totalPayments < totalPrice && "!text-red-500"
              } font-semibold grid grid-cols-2 items-center`}
            >
              <span className="ms-auto pe-4 block">
                {totalPayments > totalPrice
                  ? `0.00`
                  : (totalPrice - totalPayments).toFixed(2)}
                $
              </span>
              <span className="border-l-1 border-gray-400 ps-4 block">
                {totalPayments > totalPrice
                  ? `0.00`
                  : (totalPrice * dollar - totalPayments * dollar).toFixed(2)}
                Bs
              </span>
            </div>
          </div>
        </div>
      )}
      {option == "changes" && (
        <div className="mt-auto">
          <div className="grid mt-4 grid-cols-[130px_1fr] items-center gap-4">
            <h6 className="font-roboto text-gray-600 font-semibold">
              Cambios totales:
            </h6>
            <div
              className={`font-roboto text-gray-700 font-semibold grid grid-cols-2 items-center ${
                totalPayments > 0 &&
                totalChanges != 0 &&
                totalChanges > totalDebt &&
                "!text-red-500"
              }`}
            >
              <span className="ms-auto pe-4 block">
                {totalChanges.toFixed(2)}$
              </span>
              <span className="border-l-1 border-gray-400 ps-4 block">
                {(totalChanges * dollar).toFixed(2)}Bs
              </span>
            </div>
          </div>
          <div className="grid mt-2 grid-cols-[130px_1fr] items-center gap-4">
            <h6 className="font-roboto text-gray-600 font-semibold">
              Cambio Faltante:
            </h6>
            <div
              className={`font-roboto text-green-600 ${
                totalPayments > totalPrice &&
                totalChanges < totalDebt &&
                "!text-blue-500"
              } font-semibold grid grid-cols-2 items-center`}
            >
              <span className="ms-auto pe-4 block">
                {totalPayments <= totalPrice || totalChanges > totalDebt
                  ? `0.00`
                  : (totalDebt - totalChanges).toFixed(2)}
                $
              </span>
              <span className="border-l-1 border-gray-400 ps-4 block">
                {totalPayments <= totalPrice || totalChanges > totalDebt
                  ? `0.00`
                  : (
                      totalPayments * dollar -
                      totalPrice * dollar -
                      totalChanges * dollar
                    ).toFixed(2)}
                Bs
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
