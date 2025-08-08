import { DataBuyType } from "@/app/api/buys/type";
import SelectFormBuy from "./selectFormBuy";
import { appendField, changeSelect } from "../utils";
import { UseFieldArrayPrepend } from "react-hook-form";
import { FormBuyType } from "../types";

export default function HeadFormBuy({
  products,
  prepend,
}: {
  products: DataBuyType;
  prepend: UseFieldArrayPrepend<FormBuyType>;
}) {
  return (
    <div className=" flex items-center justify-between gap-3">
      <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
        Compra
      </h4>
      <div className="flex items-center gap-3">
        {products.data.length > 0 && (
          <SelectFormBuy
            changeSelect={(value) =>
              changeSelect({ products, prepend, value: Number(value) })
            }
            options={products.data}
          />
        )}
        <button className="" onClick={() => appendField({ prepend })}>
          Crear Producto
        </button>
      </div>
    </div>
  );
}
