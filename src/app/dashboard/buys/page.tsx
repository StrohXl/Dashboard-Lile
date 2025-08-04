import TableBuys from "@/components/buys/tables/tableBuys";
import SearchData from "@/components/dashboard/forms/searchData";
import { HookDataContext } from "@/components/dashboard/hooks/useContextData";
import Link from "next/link";
import { MdAddShoppingCart } from "react-icons/md";
const apiUrl = "/buys";

export default function Buys() {
  return (
    <HookDataContext apiUrl={apiUrl}>
      <section className="container-table overflow-hidden relative">
        <div className="flex justify-between items-centerF mb-6 ">
          <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
            Lista de Compras
          </h4>
          <div className="flex items-center gap-6">
            <SearchData apiUrl={apiUrl} placeholderInput="Buscar Compra..." />
            <Link className="btn-primary" href="/dashboard/products/create">
              Agregar
              <MdAddShoppingCart size={20} />
            </Link>
          </div>
        </div>
        <TableBuys />
      </section>
    </HookDataContext>
  );
}
