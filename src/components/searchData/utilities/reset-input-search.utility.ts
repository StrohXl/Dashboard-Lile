
import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { UseFormReset } from "react-hook-form";

import { FormSearch } from "../models/formSearch.model";
import { InputSearchType } from "../models/inputSearch.model";
import { onSubmitSearch } from "../service/on-submi-search.service";

export const resetInputSearch = ({
  replace,
  setInputName,
  pathname,
  searchParams,
  reset,
  inputSearchType,
}: {
  pathname: string;
  setInputName: (value: string) => void;
  replace: (href: string, options?: NavigateOptions) => void;
  searchParams: ReadonlyURLSearchParams;
  reset: UseFormReset<FormSearch>;
  inputSearchType: InputSearchType;
}) => {
  setInputName("");
  reset({ search: "" });
  onSubmitSearch({
    search: "",
    pathname,
    replace,
    searchParams,
    setInputName,
    inputSearchType,
  });
};
