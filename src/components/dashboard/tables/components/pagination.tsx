"use client";
import { ResponseData } from "@/models";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export default function Pagination({ data }: { data: ResponseData }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const arrayPages: number[] = [];
  const { replace } = useRouter();

  for (let index = 0; index < data.pages; index++) {
    arrayPages.push(index + 1);
  }
  // functions

  const changePage = (item: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${item}`);
    replace(pathname + "?" + params.toString());
  };

  return (
    <div className="pagination flex gap-2">
      {arrayPages.map((item) => {
        if (Number(page) == item) {
          return (
            <span
              className="h-[32px] flex justify-center border-primary items-center w-[30px] rounded-md font-roboto border-1 bg-primary text-white"
              key={item}
            >
              {item}
            </span>
          );
        } else {
          return (
            <span
              className="h-[32px] flex justify-center items-center w-[30px] rounded-md font-roboto border-1 border-gray-500 text-gray-600 transition-colors duration-300 hover:text-white hover:border-primary-ligth hover:bg-primary-ligth cursor-pointer"
              key={item}
              onClick={() => changePage(item)}
            >
              {item}
            </span>
          );
        }
      })}
    </div>
  );
}
