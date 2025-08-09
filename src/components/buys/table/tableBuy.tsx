import "@/components/dashboard/tables/css/table.css";
import NotHaveBuys from "./components/notHaveBuys";
import { HookDataContext } from "@/components/dashboard/hooks/useContextData";
import ReactTableBuys from "./components/reactTableBuy";
import Pagination from "@/components/dashboard/tables/components/pagination";
import getData from "@/fetch/data/getData";
import TypeParams from "@/types/typeParams";
import DeleteSelects from "@/components/dashboard/tables/components/deleteSelects";
import getPyDollar from "@/fetch/pydolar/getPyDolar";

export default async function TableBuys({ params }: { params?: TypeParams }) {
  const buys = await getData({ url: "/buys", params });
  const pyDollar = await getPyDollar();

  if (buys.data.length != 0) {
    return (
      <HookDataContext>
        <ReactTableBuys data={buys} pyDollar={pyDollar} />
        <div className="mt-6 ms-auto grid grid-cols-3 items-center justify-between pe-5">
          <div>
            <DeleteSelects apiUrl="/buys" data={buys} />
          </div>
          <div className="flex justify-center">
            <Pagination data={buys} />
          </div>
          <div></div>
        </div>
      </HookDataContext>
    );
  } else {
    return <NotHaveBuys />;
  }
}
