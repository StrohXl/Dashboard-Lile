import { IoClose } from "react-icons/io5";
import NotHaveProducts from "./notHaveProducts";
import {
  FieldArrayWithId,
  FieldErrors,
  UseFieldArrayRemove,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { removeProduct } from "../../../utilities";
import { useContextSale } from "../../../hooks/saleHookContext";
import { changeStock } from "../../../utilities/changeStock.utility";
import { FormSale } from "../../../models";

export default function ListProductBodyFormSale({
  fields,
  register,
  remove,
  getValues,
  watch,
  errors,
}: {
  errors: FieldErrors<FormSale>;
  fields: FieldArrayWithId<FormSale, "list_products">[];
  register: UseFormRegister<FormSale>;
  remove: UseFieldArrayRemove;
  getValues: UseFormGetValues<FormSale>;
  watch: UseFormWatch<FormSale>;
}) {
  const { setTotalPrice, dollar } = useContextSale();

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
        <h6 className="font-roboto text-gray-600 font-semibold">Producto</h6>
        <h6 className="font-roboto text-gray-600 font-semibold">Precio</h6>
        <h6 className="font-roboto text-gray-600 font-semibold">Cantidad</h6>
        <h6 className="font-roboto text-gray-600 font-semibold">Total</h6>
      </div>
      {fields.length == 0 ? (
        <NotHaveProducts />
      ) : (
        fields.map((item, index) => (
          <div
            key={item.id}
            className={`grid sm:grid-cols-[1fr_80px_100px_200px_28px] items-center gap-4
           `}
          >
            <input type="hidden" {...register(`list_products.${index}.id`)} />
            <div>
              <h6 className="font-roboto text-gray-800 font-semibold">
                {item.name}
              </h6>
            </div>

            <div>
              <h6 className="font-roboto text-gray-600 font-semibold">
                {item.price}$
              </h6>
            </div>

            <input
              type="number"
              {...register(`list_products.${index}.stock`, {
                required: {
                  value: true,
                  message: "Este campo  es  requerido",
                },
                min: {
                  value: 1,
                  message: "Valor minimo es de 1",
                },
                onChange: () => changeStock({ getValues, setTotalPrice }),
              })}
              className={`outline-none ${
                errors.list_products &&
                errors.list_products[index]?.stock &&
                "!border-1 !border-red-500"
              }`}
            />
            <div className="grid grid-cols-[45%_55%]">
              <h6 className="font-roboto text-gray-700 font-semibold">
                {(watch(`list_products.${index}.stock`) * item.price).toFixed(
                  2
                )}
                $
              </h6>
              <h6 className="font-roboto border-s-1 text-end border-gray-700 text-gray-700 font-semibold">
                {(
                  watch(`list_products.${index}.stock`) *
                  item.price *
                  dollar
                ).toFixed(2)}
                Bs
              </h6>
            </div>
            <button
              type="button"
              className="transition-colors cursor-pointer duration-300 hover:!text-red-500 p-[2px] text-gray-500"
              onClick={() =>
                removeProduct({ id: item.id, fields, remove, setTotalPrice })
              }
            >
              <IoClose size={22} />
            </button>
          </div>
        ))
      )}
    </div>
  );
}
