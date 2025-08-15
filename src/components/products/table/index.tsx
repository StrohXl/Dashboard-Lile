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
  console.log(data);

  return <NotHaveProducts />;
}
