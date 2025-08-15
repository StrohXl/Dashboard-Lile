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
  console.log(buys);

  return <NotHaveBuys />;
}
