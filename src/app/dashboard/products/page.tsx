import SearchData from "@/components/dashboard/forms/searchData";
import { HookDataContext } from "@/components/dashboard/hooks/useContextData";
import TableProducts from "@/components/products/table";
import Link from "next/link";
import { HiArchiveBoxArrowDown } from "react-icons/hi2";

const apiUrl = "/products";

export default function Products() {
  return (
    <HookDataContext apiUrl={apiUrl}>
      <section className="container-table overflow-hidden relative">
        <div className="flex justify-between items-centerF mb-6 ">
          <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
            Lista de Productos
          </h4>
          <div className="flex items-center gap-6">
            <SearchData apiUrl={apiUrl} placeholderInput="Buscar Productos..." />
            <Link className="btn-primary" href="/dashboard/products/create">
              Agregar
              <HiArchiveBoxArrowDown size={20} />
            </Link>
          </div>
        </div>
        <div className="table-responsive overflow-auto w-full">
          <TableProducts />
        </div>
      </section>
    </HookDataContext>
  );
}
