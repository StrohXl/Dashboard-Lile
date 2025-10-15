"use client";
import { Pagination } from "antd";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  LuChevronLeft,
  LuChevronRight,
  LuChevronFirst,
  LuChevronLast,
} from "react-icons/lu";
import "./css/paginanation.css";
export default function PaginationFooter({ pages }: { pages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || 1;
  const arrayPages: number[] = [];
  const { replace } = useRouter();

  for (let index = 0; index < pages; index++) {
    arrayPages.push(index + 1);
  }
  // functions

  const changePage = (item: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", `${item}`);
    replace(pathname + "?" + params.toString());
  };

  const prev = <LuChevronLeft size={20} />;
  const next = <LuChevronRight size={20} />;
  const first = <LuChevronFirst size={20} />;
  const last = <LuChevronLast size={20} />;

  return (
    <>
      <Pagination
        defaultCurrent={Number(page)}
        defaultPageSize={1}
        total={pages}
        onChange={(item) => changePage(item)}
        itemRender={(page, type) => (
          <span className="">
            {type == "jump-prev" && first}
            {type == "prev" && (
              <div className="text-gray-700 transition-colors hover:text-primary hover:bg-gray-400 hover:dark:bg-gray-700 rounded-md dark:text-white h-full flex items-center justify-center">
                {prev}
              </div>
            )}
            {type == "page" && (
              <span className="block h-full bg-white border-1 border-gray-700 dark:border-white rounded-md dark:bg-gray-700 transition-colors container-page text-gray-800 dark:text-white hover:text-primary hover:border-primary">
                {page}
              </span>
            )}
            {type == "next" && (
              <div className="text-gray-700 transition-colors hover:text-primary hover:bg-gray-400 hover:dark:bg-gray-700 rounded-md dark:text-white h-full flex items-center justify-center">
                {next}
              </div>
            )}
            {type == "jump-next" && last}
          </span>
        )}
      />
    </>
  );
}
