import { useDataContext } from "../../hooks/useContextData";

export default function Pagination() {
  const { data, page, setPage, fetchData } = useDataContext();
  const arrayPages: number[] = [];
  for (let index = 0; index < data.pages; index++) {
    arrayPages.push(index + 1);
  }
  // functions

  const changePage = (item: number) => {
    setPage(item);
    fetchData({ page: item });
  };

  return (
    <div className="pagination flex gap-2">
      {arrayPages.map((item) => {
        if (page == item) {
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
