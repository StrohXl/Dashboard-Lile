import SelectFormBuy from "./selectProductsFormBuy";
import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";
import { appendField } from "../utilities";
import { FormBuy } from "../models";

export default function HeadFormBuy({
  prepend,
  getValues,
}: {
  prepend: UseFieldArrayPrepend<FormBuy>;
  getValues: UseFormGetValues<FormBuy>;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
        Compra
      </h4>
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-3">
        <SelectFormBuy getValues={getValues} prepend={prepend} />
        <button
          className="btn-outlined-primary !w-full !sm:w-fit"
          onClick={() => appendField({ prepend })}
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
}
