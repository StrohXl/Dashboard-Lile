import "@/components/dashboard/tables/css/table.css";
import NotHaveBuys from "./components/notHaveBuys";
import getData from "@/fetch/data/getData";
import TypeParams from "@/types/typeParams";

export default async function TableBuys({ params }: { params?: TypeParams }) {
  const buys = await getData({ url: "/buys", params });
  console.log(buys);
  return <NotHaveBuys />;
}
