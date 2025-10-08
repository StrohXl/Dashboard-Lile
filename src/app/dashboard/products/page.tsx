
import getPyDollar from "@/fetch/pydolar/getPyDolar";
import getAllData from "@/services/get/all/getAllData";
import Link from "next/link";
import { Suspense } from "react";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";

import { Product } from "@/models/api/product";
import UrlParams from "@/models/url-params.model";

import { HookDataContext } from "@/hooks/useContextData";

import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";
import SearchData from "@/components/searchData/inputSearch";

import TableProducts from "@/features/products/table/tableProducts";

export default async function Products({
  searchParams,
}: {
  searchParams: Promise<UrlParams>;
}) {
  const params = await searchParams;
  const { name, deleteId, page } = params;

  const products = getAllData<Product>({ apiUrl: "/products", params });
  const pyDollar = getPyDollar();

  return (
    <section className="container-table max-w-[1200px] overflow-hidden relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Lista de Productos
        </h4>
        <div className="flex items-center gap-6">
          <SearchData
            inputSearchType="name"
            placeholderInput="Buscar Productos..."
          />
          <Link className="btn-primary" href="/dashboard/products/create">
            Agregar
            <HiArchiveBoxArrowDown size={20} />
          </Link>
        </div>
      </div>
      <Suspense key={name ?? "" + deleteId + page} fallback={<SkeletonTable />}>
        <HookDataContext>
          <TableProducts data={products} pyDollar={pyDollar} />
        </HookDataContext>
      </Suspense>
    </section>
  );
}
