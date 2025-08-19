import SelectFormBuy from "./selectProductsFormBuy";
import { FieldArrayWithId, UseFieldArrayPrepend } from "react-hook-form";
import { changeSelect, appendField } from "../utilities";
import { DataProduct } from "@/app/api/products/models";
import { FormBuy } from "../models";

export default function HeadFormBuy({
  products,
  prepend,
  fields,
}: {
  products: DataProduct;
  fields: FieldArrayWithId<FormBuy>[];
  prepend: UseFieldArrayPrepend<FormBuy>;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
        Compra
      </h4>
      <div className="flex flex-col-reverse md:flex-row md:items-center gap-3">
        {products.data.length > 0 && (
          <SelectFormBuy
            changeSelect={(value) =>
              changeSelect({
                products,
                prepend,
                value: Number(value),
              })
            }
            fields={fields}
            options={products.data}
          />
        )}
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
