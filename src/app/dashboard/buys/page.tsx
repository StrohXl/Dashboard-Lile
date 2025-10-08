import getPyDollar from "@/fetch/pydolar/getPyDolar";
import Link from "next/link";
import { Suspense } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { HookDataContext } from "@/hooks/useContextData";

import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";

import TableBuy from "@/features/buys/table/tableBuy";
import getAllData from "@/services/get/all/getAllData";
import { Buy } from "@/models/api/buy";

export default async function Buys({
  searchParams,
}: {
  searchParams: Promise<{ name: string; page: string; deleteId: string }>;
}) {
  const params = await searchParams;
  const { name, page, deleteId } = params;

  const buys = getAllData<Buy>({ apiUrl: "/buys", params });
  const pyDollar = getPyDollar();
  return (
    <section className="container-table max-w-[1200px] overflow-hidden relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Lista de Compras
        </h4>
        <div className="flex items-center gap-6">
          <Link className="btn-primary" href="/dashboard/buys/create">
            Agregar
            <MdAddShoppingCart size={20} />
          </Link>
        </div>
      </div>
      <Suspense key={name + page + deleteId} fallback={<SkeletonTable />}>
        <HookDataContext>
          <TableBuy data={buys} pyDollar={pyDollar} />
        </HookDataContext>
      </Suspense>
    </section>
  );
}
