import Link from "next/link";
import { Suspense } from "react";
import { FaUserPlus } from "react-icons/fa6";


import UrlParams from "@/models/url-params.model";

import { HookDataContext } from "@/hooks/useContextData";

import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";
import SearchData from "@/components/searchData/inputSearch";

import TableClients from "@/features/clients/table/tableClients";
import getAllData from "@/services/get/all/getAllData";
import { Client } from "@/models/api/client";

export default async function Clients({
  searchParams,
}: {
  searchParams: Promise<UrlParams>;
}) {
  const params = await searchParams;
  const { deleteId, ci, page } = params;
  const clients = getAllData<Client>({ apiUrl: "/clients", params });

  return (
    <section className="container-table max-w-[800px] overflow-hidden relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Lista de clientes
        </h4>
        <div className="flex items-center gap-6">
          <SearchData type="number" inputSearchType="ci" placeholderInput="Cedula del Cliente" />
          <Link className="btn-primary" href="/dashboard/clients/create">
            Agregar
            <FaUserPlus size={20} />
          </Link>
        </div>
      </div>
      <Suspense key={ci?? '' + page + deleteId} fallback={<SkeletonTable />}>
        <HookDataContext>
          <TableClients data={clients} />
        </HookDataContext>
      </Suspense>
    </section>
  );
}
