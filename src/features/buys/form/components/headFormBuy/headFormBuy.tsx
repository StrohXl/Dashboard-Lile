"use client";
import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";

import { FaPlus } from "react-icons/fa";

import SearchMenuHooks from "@/components/dashboard/searchMenu/hooks/searchMenuHooks";
import SearchMenu from "@/components/dashboard/searchMenu/searchMenu";
import { OptionProducts } from "@/components/dashboard/searchMenu/services/getProducts.service";
import { searchProduct } from "@/components/dashboard/searchMenu/utils/searchProduct";

import { FormBuy } from "../../models";
import { addProduct } from "./utils/add-product.utility";
import { appendField } from "./utils/append-field.utilitiy";

export default function HeadFormBuy({
  prepend,
  getValues,
}: {
  prepend: UseFieldArrayPrepend<FormBuy>;
  getValues: UseFormGetValues<FormBuy>;
}) {
  const {
    loading,
    open,
    options,
    setLoading,
    setOpen,
    setOptions,
    setTextSearch,
    textSearch,
  } = SearchMenuHooks<OptionProducts>();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="mb-2 font-open_sans text-gray-800  dark:text-white font-semibold text-2xl">
        Compra
      </h4>
      <div className="grid md:grid-cols-[1fr_200px] items-center gap-3">
        <SearchMenu<OptionProducts>
          closeMenu={() => setOpen(false)}
          loading={loading}
          open={open}
          options={options}
          textSearch={textSearch as string}
          onChange={(text) => {
            const idFields = getValues("products").map((item) => item.id);
            searchProduct({
              text: text as string,
              setLoading,
              setOptions,
              setOpen,
              setTextSearch,
              idFields,
              params: "name",
            });
          }}
          notFoundMessage="No se encontraron productos"
          placeholder="Nombre del Producto"
          onClickItem={(item) =>
            addProduct({ product: item, prepend, setOpen, setTextSearch })
          }
        />
        <button
          className="btn-outlined-primary !w-full !sm:w-fit"
          onClick={() => appendField({ prepend })}
        >
          Agregar Producto
          <FaPlus />
        </button>
      </div>
    </div>
  );
}
