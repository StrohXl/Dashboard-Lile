import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";

import { FormSale } from "../../../models";
import SelectProduct from "./searchProduct/selectProduct";
import { useContextSale } from "../../../hooks/saleHookContext";

export default function ListProductHeadFormSale({
  prepend,
  getValues,
}: {
  prepend: UseFieldArrayPrepend<FormSale>;
  getValues: UseFormGetValues<FormSale>;
}) {
  const { idSale } = useContextSale();
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="mb-2 font-roboto text-gray-800 dark:text-white font-semibold text-lg">
        Lista de Productos
      </h4>
      {idSale == 0 && (
        <div className="grid md:grid-cols-[250px_250px] items-center gap-4">
          <SelectProduct
            getValues={getValues}
            prependProduct={prepend}
            params="id"
            placeholder="Id del producto"
          />
          <SelectProduct
            getValues={getValues}
            prependProduct={prepend}
            params="name"
            placeholder="Nombre del producto"
          />
        </div>
      )}
    </div>
  );
}
