import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { onSubmitSearch } from "../service/on-submi-search.service";
import { ReadonlyURLSearchParams } from "next/navigation";
import { UseFormReset } from "react-hook-form";

export const resetInputSearch = ({
  replace,
  setInputName,
  pathname,
  searchParams,
  reset,
}: {
  pathname: string;
  setInputName: (value: string) => void;
  replace: (href: string, options?: NavigateOptions) => void;
  searchParams: ReadonlyURLSearchParams;
  reset: UseFormReset<{
    name: string;
  }>;
}) => {
  setInputName("");
  reset({ name: "" });
  onSubmitSearch({
    search: "",
    pathname,
    replace,
    searchParams,
    setInputName,
  });
};
