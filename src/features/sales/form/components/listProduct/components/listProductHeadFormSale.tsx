import SelectProductsFormSale from "./selectProductsFormSale";
import { FieldArrayWithId, UseFieldArrayPrepend } from "react-hook-form";
import { useContextSale } from "../../../hooks/saleHookContext";
import { FormSale } from "../../../models";
import { changeSelect } from "../utils";

export default function ListProductHeadFormSale({
  prepend,
  fields,
}: {
  fields: FieldArrayWithId<FormSale, "list_products">[];
  prepend: UseFieldArrayPrepend<FormSale>;
}) {
  const { products, setTotalPrice } = useContextSale();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="mb-2 font-roboto text-gray-800 font-semibold text-lg">
        Lista de Productos
      </h4>
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-3">
        <SelectProductsFormSale
          changeSelect={(value) =>
            changeSelect({
              products,
              prepend,
              value: Number(value),
              fields,
              setTotalPrice,
            })
          }
          fields={fields}
        />
      </div>
    </div>
  );
}
