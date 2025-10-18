import { UseFieldArrayReturn, UseFormReturn } from "react-hook-form";
import { IoClose } from "react-icons/io5";

import { useContextSale } from "../../../hooks/saleHookContext";
import { FormSale } from "../../../models";
import { changeStock } from "../../../utilities/changeStock.utility";
import { removeProduct } from "../utils";
import NotHaveProducts from "./notHaveProducts";

export default function ListProductBodyFormSale({
  useFormSale,
  useFieldProducts,
}: {
  useFormSale: UseFormReturn<FormSale>;
  useFieldProducts: UseFieldArrayReturn<FormSale, "list_products", "id">;
}) {
  const { fields, remove } = useFieldProducts;

  const {
    watch,
    formState: { errors },
    register,
    getValues,
  } = useFormSale;

  const { setTotalPrice, dollar, idSale } = useContextSale();

  return (
    <div
      className={`container-fields gap-4 pt-3  ${
        fields.length > 0 && ""
      } flex flex-col`}
    >
      <div
        className={`grid  sm:grid-cols-[1fr_80px_100px_200px_28px] items-center gap-4
           `}
      >
        <h6 className="font-roboto text-gray-600 dark:text-gray-200 font-semibold">
          Producto
        </h6>
        <h6 className="font-roboto text-gray-600 dark:text-gray-200 font-semibold">
          Precio
        </h6>
        <h6 className="font-roboto text-gray-600 dark:text-gray-200 font-semibold">
          Cantidad
        </h6>
        <h6 className="font-roboto text-gray-600 dark:text-gray-200 font-semibold">
          Total
        </h6>
      </div>
      {fields.length == 0 ? (
        <NotHaveProducts />
      ) : (
        fields.map((item, index) => {
          const stock = watch(`list_products.${index}.stock`);
          const unit = watch(`list_products.${index}.unit`);
          const totalPriceProduct = Number((stock * item.price).toFixed(2));
          const totalPriceProductKg = Number((stock * item.price).toFixed(2));
          return (
            <div
              key={item.id}
              className={`grid sm:grid-cols-[1fr_80px_100px_200px_28px] items-center gap-4
           `}
            >
              <input type="hidden" {...register(`list_products.${index}.id`)} />
              <input
                type="hidden"
                {...register(`list_products.${index}.unit`)}
              />

              <div>
                <h6 className="font-roboto text-gray-800 dark:text-white font-semibold">
                  {item.name}
                </h6>
              </div>

              <div>
                <h6 className="font-roboto text-gray-700 dark:text-gray-200 font-semibold">
                  {Number(item.price).toFixed(2)}$
                </h6>
              </div>

              <div className="grid grid-cols-[1fr_auto] items-center gap-1">
                <input
                  type="number"
                  {...register(`list_products.${index}.stock`, {
                    required: {
                      value: true,
                      message: "Este campo  es  requerido",
                    },
                    min: {
                      value: unit == "kg" ? 0 : 1,
                      message: `Valor minimo es de ${unit == "kg" ? "0" : 1}`,
                    },
                    onChange: () => changeStock({ getValues, setTotalPrice }),
                  })}
                  step={unit == "kg" ? "any" : "1"}
                  className={`outline-none w-full ${
                    errors.list_products &&
                    errors.list_products[index]?.stock &&
                    "!border-1 !border-red-500"
                  }`}
                  disabled={idSale != 0}
                />
                {unit == "kg" && <span>Kg</span>}
              </div>
              <div className="grid grid-cols-[45%_55%]">
                <h6 className="font-roboto text-gray-700  dark:text-gray-200 font-semibold">
                  {unit == "unit"
                    ? totalPriceProduct.toFixed(2)
                    : totalPriceProductKg.toFixed(2)}
                  $
                </h6>
                <h6 className="font-roboto border-s-1 text-end border-gray-700 text-gray-700dark:text-gray-200 font-semibold">
                  {unit == "unit"
                    ? (totalPriceProduct * dollar).toFixed(2)
                    : (totalPriceProductKg * dollar).toFixed(2)}
                  Bs
                </h6>
              </div>
              {idSale == 0 && (
                <button
                  type="button"
                  className="transition-colors cursor-pointer duration-300 hover:!text-red-500 p-[2px] text-gray-500 dark:text-gray-100"
                  onClick={() =>
                    removeProduct({
                      id: item.id,
                      fields,
                      remove,
                      setTotalPrice,
                    })
                  }
                >
                  <IoClose size={22} />
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}
