"use client";
import SearchProduct from "@/components/dashboard/products/forms/searchProduct";
import TableProducts from "@/components/dashboard/products/tables/tableProducts";
import { HooksTableProvider } from "@/components/dashboard/products/tables/tableProducts/hooks/hooksTable";
import Link from "next/link";
import { TiPlus } from "react-icons/ti";

export default function Products() {
  return (
    <HooksTableProvider>
      <section className="container-table overflow-hidden relative">
        <div className="flex justify-between items-centerF mb-6 ">
          <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
            Productos
          </h4>
          <div className="flex items-center gap-6">
            <SearchProduct />
            <Link className="btn-primary" href="/dashboard/products/create">
              Agregar Producto
              <TiPlus size={20} />
            </Link>
          </div>
        </div>
        <div className="table-responsive overflow-auto w-full">
          <TableProducts />
        </div>
      </section>
    </HooksTableProvider>
  );
}
