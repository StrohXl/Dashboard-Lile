import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayPrepend,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { useContextSale } from "../../hooks/saleHookContext";
import { FormSale } from "../../models";
import FooterChanges from "./components/footerChanges";
import FooterPayments from "./components/footerPayments";
import ListBody from "./components/listBody";
import { OptionList } from "./models/optionList.model";
import {
  prependChange,
  prependPayment,
  updateTotalChanges,
  updateTotalPayments,
} from "./utils";

export default function ListPaymentsAndChanges({
  errors,
  getValues,
  register,
  watch,
  option,
  prepend,
  fields,
  remove,
  setValue,
}: {
  remove: UseFieldArrayRemove;
  fields: FieldArrayWithId<FormSale>[];
  prepend: UseFieldArrayPrepend<FormSale>;
  option: OptionList;
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  watch: UseFormWatch<FormSale>;
  getValues: UseFormGetValues<FormSale>;
  setValue: UseFormSetValue<FormSale>;
}) {
  const {
    dollar,
    totalPrice,
    setTotalPayments,
    totalPayments,
    totalChanges,
    setTotalChanges,
  } = useContextSale();

  const addInput = () => {
    if (option == "payments") {
      prependPayment({ prepend, dollar, totalPayments, totalPrice });
      setTimeout(
        () => updateTotalPayments({ dollar, getValues, setTotalPayments }),
        200
      );
    } else {
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
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <h4 className="font-roboto text-gray-800 font-semibold text-lg">
          {option == "payments" ? "Pagos" : "Cambios"}
        </h4>
        <button
          onClick={addInput}
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

        {fields.map((item, index) => (
          <div
            key={item.id}
            className={`grid sm:grid-cols-[1fr_90px_90px_100px] items-center gap-4
                 `}
          >
            <ListBody
              errors={errors}
              getValues={getValues}
              index={index}
              option={option}
              register={register}
              remove={remove}
              watch={watch}
              setValue={setValue}
            />
          </div>
        ))}
      </div>

      {option == "payments" ? <FooterPayments /> : <FooterChanges />}
    </div>
  );
}
