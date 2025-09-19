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
      <div className="grid md:grid-cols-[250px_250px] items-center gap-4">
        <SelectProductsFormSale
          prependProduct={prepend}
          getValues={getValues}
          typeSearch="id"
        />
        <SelectProductsFormSale
          prependProduct={prepend}
          getValues={getValues}
          typeSearch="name"
        />
      </div>
    </div>
  );
}
