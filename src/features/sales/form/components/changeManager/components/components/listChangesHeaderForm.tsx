import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "@/features/sales/form/models";
import { prependChange } from "../../utils/prependChange.utility";

export default function ListChangesHeaderForm({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormSale, "change_manager">;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="font-roboto text-gray-800 font-semibold text-lg">Cambios</h4>
      <button
        onClick={() => prependChange(prepend)}
        className="btn-outlined-primary"
      >
        Agregar cambio
      </button>
    </div>
  );
}
