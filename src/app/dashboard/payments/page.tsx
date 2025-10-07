import getData from "@/fetch/data/getData";
import { Suspense } from "react";


import UrlParams from "@/models/url-params.model";

import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";

import TablePayments from "@/features/payments/table/tablePayments";

export default async function Payments({
  searchParams,
}: {
  searchParams: Promise<UrlParams>;
}) {
  const params = await searchParams;
  const { name, deleteId, page } = params;

  const payments = getData({ url: "/payments", params });

  return (
    <section className="container-table max-w-[800px] overflow-hidden relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Lista de Pagos
        </h4>
        <div className="flex items-center gap-6"></div>
      </div>
      <Suspense key={name ?? "" + deleteId + page} fallback={<SkeletonTable />}>
        <TablePayments data={payments} />
      </Suspense>
    </section>
  );
}
