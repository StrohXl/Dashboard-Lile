import "@/components/dashboard/tables/css/table.css";
import NotHaveProducts from "./components/notHaveProducts";
import ReactTableProducts from "./components/reactTableProducts";
import Pagination from "@/components/dashboard/tables/components/pagination";
import DeleteSelects from "@/components/dashboard/tables/components/deleteSelects";
import getData from "@/fetch/data/getData";
import TypeParams from "@/types/typeParams";
import getPyDolar from "@/fetch/pydolar/getPyDolar";
import { HookDataContext } from "@/components/dashboard/hooks/useContextData";

export default async function TableProducts({
  params,
}: {
  params: TypeParams;
}) {
  const data = await getData({ url: "/products", params });
  const pyDollar = await getPyDolar();

  if (data.data.length != 0) {
    return (
      <HookDataContext>
        <ReactTableProducts data={data} pyDollar={pyDollar} />
        <div className="mt-6 ms-auto grid grid-cols-3 items-center justify-between pe-5">
          <div>
            <DeleteSelects data={data} apiUrl="/products" />
          </div>
          <div className="flex justify-center">
            <Pagination data={data} />
          </div>
          <div></div>
        </div>
      </HookDataContext>
    );
  } else {
    return <NotHaveProducts />;
  }
}
