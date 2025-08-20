import { NavigateOptions } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ReadonlyURLSearchParams } from "next/navigation";
export async function onSubmitSearch({
  replace,
  search,
  setInputName,
  pathname,
  searchParams,
}: {
  pathname: string;
  search: string;
  setInputName: (value: string) => void;
  replace: (href: string, options?: NavigateOptions) => void;
  searchParams: ReadonlyURLSearchParams;
}) {
  let time: ReturnType<typeof setTimeout> = setTimeout(() => {});
  setInputName(search);
  const params = new URLSearchParams(searchParams);
  clearTimeout(time);
  time = setTimeout(async () => {
    if (search) {
      params.set("name", search);
    } else {
      params.delete("name");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 150);
}
