import "@/components/dashboard/tables/css/table.css";
import NotHaveProducts from "./components/notHaveProducts";
import getData from "@/fetch/data/getData";
import TypeParams from "@/types/typeParams";

export default async function TableProducts({
  params,
}: {
  params: TypeParams;
}) {
  const data = await getData({ url: "/products", params });

  return <NotHaveProducts site_url={data} />;
}
