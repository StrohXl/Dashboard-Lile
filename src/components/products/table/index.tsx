"use client";
import "@/components/dashboard/tables/css/table.css";
import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";
import NotHaveProducts from "./components/notHaveProducts";
import ReactTableProducts from "./components/reactTableProducts";
import Pagination from "@/components/dashboard/tables/components/pagination";
import DeleteSelects from "@/components/dashboard/tables/components/deleteSelects";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";

export default function TableProducts() {
  const { data, loading } = useDataContext();

  if (loading) {
    return <SkeletonTable />;
  } else {
    if (data.data.length != 0) {
      return (
        <>
          <div className="h-[380px]" >
            <ReactTableProducts />
          </div>
          <div className="mt-6 ms-auto grid grid-cols-3 items-center justify-between pe-5">
            <div>
              <DeleteSelects />
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
