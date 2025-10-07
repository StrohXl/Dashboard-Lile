
import getData from "@/fetch/data/getData";
import getPyDollar from "@/fetch/pydolar/getPyDolar";
import Link from "next/link";
import { Suspense } from "react";
import { FaCashRegister } from "react-icons/fa6";

import UrlParams from "@/models/url-params.model";

import { HookDataContext } from "@/hooks/useContextData";

import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";

import TableSales from "@/features/sales/table/tableSales";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<UrlParams>;
}) {
  const params = await searchParams;
  const { name, deleteId, page } = params;

  const sales = getData({ url: "/sales", params });
  const pyDollar = getPyDollar();

  return (
    <section className="container-table overflow-hidden max-w-[1200px] relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Lista de Ventas
        </h4>
        <div className="flex items-center gap-6">
          <Link className="btn-primary" href="/dashboard/sales/create">
            Agregar
            <FaCashRegister size={20} />
          </Link>
        </div>
      </div>
      <Suspense key={name ?? "" + deleteId + page} fallback={<SkeletonTable />}>
        <HookDataContext>
          <TableSales data={sales} pyDollar={pyDollar} />
        </HookDataContext>
      </Suspense>
    </section>
  );
}
