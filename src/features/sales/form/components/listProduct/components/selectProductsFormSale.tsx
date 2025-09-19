import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";
import { useContextSale } from "../../../hooks/saleHookContext";
import {
  addProduct,
  searchProduct,
  updateTotalPriceByListProduct,
} from "../utils";
import { FormSale } from "../../../models";
import { Product } from "@/app/api/products/models";

export default function SelectProductsFormSale({
  getValues,
  prependProduct,
}: {
  getValues: UseFormGetValues<FormSale>;
  prependProduct: UseFieldArrayPrepend<FormSale, "list_products">;
}) {
  const {
    open,
    search,
    setOpen,
    setSearch,
    setOptions,
    options,
    loading,
    setLoading,
    setTotalPrice,
  } = useContextSale();

  const onClickProduct = (product: Product) => {
    addProduct({
      prependProduct,
      product,
      setOpen,
      setSearch,
    });
    setTimeout(
      () => updateTotalPriceByListProduct({ getValues, setTotalPrice }),
      200
    );
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_auto] relative z-30 items-center gap-2 px-4 border-1 border-gray-700 rounded-md">
        <input
          value={search}
          type="text"
          className="py-2  outline-none text-gray-700 placeholder:text-gray-600 sm:max-w-[160px] md:max-w-full md:w-[400px]"
          placeholder="Nombre del producto"
          onChange={(item) =>
            searchProduct({
              text: item.target.value,
              setLoading,
              getValues,
              setOpen,
              setSearch,
              setOptions,
            })
          }
        />
      </div>
      <ul
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        className={`flex left-0 mt-3 top-full w-full py-2 z-30 flex-col  rounded-md bg-white absolute h-fit max-h-[150px] overflow-auto  ${
          !open && "hidden"
        }`}
      >
        {loading ? (
          <li className="px-4 font-roboto">Buscando....</li>
        ) : options.length == 0 ? (
          <li className="!px-4 font-roboto">No se encontraron productos</li>
        ) : (
          options.map((item) => (
            <li
              className="!px-4 transition-colors duration-300 font-roboto hover:bg-primary hover:text-white cursor-pointer py-1"
              onClick={() => onClickProduct(item)}
              key={item.id}
            >
              <p className="truncate"> {item.name}</p>
            </li>
          ))
        )}
      </ul>
      <div
        className={`fixed top-0  z-20  left-0 w-full h-full bg-transparent ${
          !open && "hidden"
        }`}
        onClick={() => setOpen(false)}
      ></div>
    </div>
  );
}
