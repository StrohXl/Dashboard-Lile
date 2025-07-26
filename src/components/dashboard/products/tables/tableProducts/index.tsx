"use client";
import "../css/table.css";
import SkeletonTable from "@/components/skeleton/skeletonTable";
import NotHaveProducts from "./components/notHaveProducts";
import { useProductsContext } from "./hooks/hooksTable";
import ReactTable from "./components/reactTable";
import Pagination from "./components/pagination";
import DeleteProducts from "./components/deleteProducts";

export default function TableProducts() {
  const { data, loading } = useProductsContext();

  if (loading) {
    return <SkeletonTable />;
  } else {
    if (data.products.length != 0) {
      return (
        <>
          <ReactTable />
          <div className="mt-6 ms-auto grid grid-cols-3 items-center justify-between pe-5">
            <div>
              <DeleteProducts />
            </div>
            <div className="flex justify-center">
              <Pagination />
            </div>
            <div></div>
          </div>
        </>
      );
    } else {
      return <NotHaveProducts />;
    }
  }
}
