import SearchData from "@/components/dashboard/forms/searchData";
import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";
import TableProducts from "@/features/products/table";
import TypeParams from "@/models/typeParams";
import Link from "next/link";
import { Suspense } from "react";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<TypeParams>;
}) {
  const params = await searchParams;
  const { name, deleteId, page } = params;

  return (
    <section className="container-table max-w-[1200px] overflow-hidden relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Lista de Productos
        </h4>
        <div className="flex items-center gap-6">
          <SearchData placeholderInput="Buscar Productos..." />
          <Link className="btn-primary" href="/dashboard/products/create">
            Agregar
            <HiArchiveBoxArrowDown size={20} />
          </Link>
        </div>
      </div>
      <Suspense key={name ?? "" + deleteId + page} fallback={<SkeletonTable />}>
        <TableProducts params={params} />
      </Suspense>
    </section>
  );
}
