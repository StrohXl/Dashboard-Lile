"use client";
import SearchMenu from "@/components/dashboard/searchMenu/searchMenu";
import MenuHooks from "@/components/dashboard/searchMenu/hooks/searchMenuHooks";
import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";
import { FormSale } from "@/features/sales/form/models";
import { OptionProducts } from "@/components/dashboard/searchMenu/services/getProducts.service";
import { searchProduct } from "@/components/dashboard/searchMenu/utils/searchProduct";
import { addProduct } from "./utils/addProduct.utility";
import { updateTotalPriceByListProduct } from "../../utils";
import { useContextSale } from "@/features/sales/form/hooks/saleHookContext";

export default function SelectProduct({
  placeholder,
  params,
  getValues,
  prependProduct,
}: {
  placeholder: string;
  params: "id" | "name";
  getValues: UseFormGetValues<FormSale>;
  prependProduct: UseFieldArrayPrepend<FormSale, "list_products">;
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
  } = MenuHooks<OptionProducts>();

  const { setTotalPrice } = useContextSale();

  return (
    <SearchMenu<OptionProducts>
      closeMenu={() => setOpen(false)}
      loading={loading}
      open={open}
      options={options}
      textSearch={textSearch as string}
      onChange={(text) => {
        const idFields = getValues("list_products").map((item) => item.id);
        searchProduct({
          text: text as string,
          setLoading,
          setOptions,
          setOpen,
          setTextSearch,
          idFields,
          params,
        });
      }}
      type={params == "id" ? "number" : "text"}
      notFoundMessage="No se encontraron productos"
      placeholder={placeholder}
      onClickItem={(product) => {
        addProduct({ product, prependProduct });
        setOpen(false);
        setTextSearch("");
        setTimeout(
          () => updateTotalPriceByListProduct({ getValues, setTotalPrice }),
          200
        );
      }}
    />
  );
}
