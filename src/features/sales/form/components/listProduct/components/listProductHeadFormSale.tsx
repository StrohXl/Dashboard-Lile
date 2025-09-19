import SelectProductsFormSale from "./selectProductsFormSale";
import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";
import { FormSale } from "../../../models";

export default function ListProductHeadFormSale({
  prepend,
  getValues,
}: {
  prepend: UseFieldArrayPrepend<FormSale>;
  getValues: UseFormGetValues<FormSale>;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="mb-2 font-roboto text-gray-800 font-semibold text-lg">
        Lista de Productos
      </h4>
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-3">
        <SelectProductsFormSale
          prependProduct={prepend}
          getValues={getValues}
        />
      </div>
    </div>
  );
}
