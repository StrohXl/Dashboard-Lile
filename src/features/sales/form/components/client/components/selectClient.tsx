"use client";
import { UseFormSetValue } from "react-hook-form";

import MenuHooks from "@/components/dashboard/searchMenu/hooks/searchMenuHooks";
import SearchMenu from "@/components/dashboard/searchMenu/searchMenu";
import { OptionClients } from "@/components/dashboard/searchMenu/services/getClients.service";

import { FormSale } from "../../../models";
import { addClient } from "../utils/addClient";
import { searchClients } from "../utils/searchClients";




export default function SelectClient({
  placeholder,
  params,
  setValue,
}: {
  placeholder: string;
  params: "ci" | "name";
  setValue: UseFormSetValue<FormSale>;
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
  } = MenuHooks<OptionClients>();

  return (
    <SearchMenu<OptionClients>
      closeMenu={() => setOpen(false)}
      loading={loading}
      open={open}
      textSearch={textSearch as string}
      notFoundMessage="No se encontro ningun cliente"
      options={options}
      placeholder={placeholder}
      type={params == "ci" ? "number" : "text"}
      onChange={(text) =>
        searchClients({
          params:
            params == "ci" ? { ci: text as string } : { name: text as string },
          setLoading,
          setOpen,
          setOptions,
          setTextSearch,
          text: text as string,
        })
      }
      onClickItem={(client) =>
        addClient({ client, setOpen, setTextSearch, setValue })
      }
    />
  );
}
