import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
import { InputSearchType } from "../models/inputSearch.model";
export async function onSubmitSearch({
  replace,
  search,
  setInputName,
  pathname,
  searchParams,
  inputSearchType,
}: {
  pathname: string;
  search: string;
  setInputName: (value: string) => void;
  replace: (href: string, options?: NavigateOptions) => void;
  searchParams: ReadonlyURLSearchParams;
  inputSearchType: InputSearchType;
}) {
  let time: ReturnType<typeof setTimeout> = setTimeout(() => {});
  setInputName(search);
  const params = new URLSearchParams(searchParams);
  clearTimeout(time);
  time = setTimeout(async () => {
    if (search) {
      if (inputSearchType == "name") {
        params.set("name", search);
      } else if (inputSearchType == "ci") {
        params.set("ci", search);
      }
    } else {
      params.delete("name");
      params.delete("ci");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 150);
}
