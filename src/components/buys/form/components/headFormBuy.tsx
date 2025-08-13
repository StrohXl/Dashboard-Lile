import { DataBuyType } from "@/app/api/buys/type";
import SelectFormBuy from "./selectProductsFormBuy";
import { appendField, changeSelect } from "../utils";
import { UseFieldArrayPrepend } from "react-hook-form";
import { FormBuyType } from "../types";

export default function HeadFormBuy({
  products,
  prepend,
  pyDollar,
}: {
  products: DataBuyType;
  pyDollar: number;
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
              changeSelect({
                products,
                prepend,
                value: Number(value),
                pyDollar,
              })
            }
            options={products.data}
          />
        )}
        <button
          className="btn-outlined-primary"
          onClick={() => appendField({ prepend, pyDollar })}
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
}
