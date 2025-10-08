import { Suspense } from "react";

import UrlParams from "@/models/url-params.model";

import { HookDataContext } from "@/hooks/useContextData";

import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";

import TableChangeManager from "@/features/change_manager/table/tableChangeManager";
import getAllData from "@/services/get/all/getAllData";
import { ChangeManager } from "@/models/api/change_manager";

export default async function ChangeManagers({
  searchParams,
}: {
  searchParams: Promise<UrlParams>;
}) {
  const params = await searchParams;
  const { name, deleteId, page } = params;

  const changes = getAllData<ChangeManager>({
    apiUrl: "/change_manager",
    params,
  });

  return (
    <section className="container-table max-w-[800px] overflow-hidden relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Lista de Cambios
        </h4>
        <div className="flex items-center gap-6"></div>
      </div>
      <Suspense key={name ?? "" + deleteId + page} fallback={<SkeletonTable />}>
        <HookDataContext>
          <TableChangeManager data={changes} />
        </HookDataContext>
      </Suspense>
    </section>
  );
}
