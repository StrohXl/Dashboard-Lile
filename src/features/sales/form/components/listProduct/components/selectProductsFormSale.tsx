import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";
import { useContextSale } from "../../../hooks/saleHookContext";
import {
  addProduct,
  searchProduct,
  updateTotalPriceByListProduct,
} from "../utils";
import { FormSale } from "../../../models";
import { Product } from "@/app/api/products/models";
import { searchProductById } from "../utils/searchProductById";
import { useState } from "react";

export default function SearchProduct({
  getValues,
  prependProduct,
  typeSearch,
}: {
  getValues: UseFormGetValues<FormSale>;
  typeSearch: "id" | "name";
  prependProduct: UseFieldArrayPrepend<FormSale, "list_products">;
}) {
  const {
    open,
    setOpen,
    setOptions,
    options,
    loading,
    setLoading,
    setTotalPrice,
  } = useContextSale();

  const [idSearch, setIdSearch] = useState<string>();
  const [idOpen, setIdOpen] = useState<boolean>(false);
  const [searchName, setSearchName] = useState<string>();

  const onClickProduct = (product: Product) => {
    addProduct({
      prependProduct,
      product,
    });
    setOpen(false);
    setIdOpen(false);
    if (typeSearch == "id") {
      setIdSearch("");
    } else {
      setSearchName("");
    }
    setTimeout(
      () => updateTotalPriceByListProduct({ getValues, setTotalPrice }),
      200
    );
  };

  const onChangeInput = (value: string) => {
    if (typeSearch == "id") {
      setIdSearch(value);
      searchProductById({
        getValues,
        id: value,
        setLoading,
        setOpen: setIdOpen,
        setOptions,
      });
    } else {
      setSearchName(value);
      searchProduct({
        getValues,
        setLoading,
        setOpen,
        setOptions,
        text: value,
      });
    }
  };

  return (
    <div className="relative">
      <div className={`grid grid-cols-[1fr_auto] relative  items-center gap-2 px-4 border-1 border-gray-700 rounded-md ${typeSearch == "id"?  idOpen && 'z-30': open && 'z-30' }`}>
        <input
          value={typeSearch == "id" ? idSearch : searchName}
          type={typeSearch == "id" ? "number" : "text"}
          className="py-2  outline-none text-gray-700 placeholder:text-gray-600 w-full"
          onChange={(event) => onChangeInput(event.target.value)}
          placeholder={`${typeSearch == "id" ? "Id" : "Nombre"} del producto`}
        />
      </div>
      <ul
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        className={`flex left-0 mt-3 top-full w-full py-2 z-30 flex-col  rounded-md bg-white absolute h-fit max-h-[150px] overflow-auto  ${
          typeSearch == "id" ? !idOpen && "hidden" : !open && "hidden"
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
          typeSearch == "id" ? !idOpen && "hidden" : !open && "hidden"
        }`}
        onClick={() => {
          setOpen(false);
          setIdOpen(false);
        }}
      ></div>
    </div>
  );
}
