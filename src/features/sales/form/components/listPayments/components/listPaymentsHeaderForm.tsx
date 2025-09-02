import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "../../../models";
import { prependPayment } from "../utils/prependPayment.utility";

export default function ListPaymentsHeaderForm({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormSale, "payments">;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="font-roboto text-gray-800 font-semibold text-lg">Pagos</h4>
      <button
        onClick={() => prependPayment(prepend)}
        className="btn-outlined-primary"
      >
        Agregar pago
      </button>
    </div>
  );
}
