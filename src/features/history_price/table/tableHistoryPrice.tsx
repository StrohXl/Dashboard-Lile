import { HookDataContext } from "@/hooks/useContextData";
import { Suspense } from "react";
import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";
import getPyDollar from "@/fetch/pydolar/getPyDolar";
import getData from "@/fetch/data/getData";
import GetPromise from "./components/getPromise";

export default function TableHistoryPrice() {
  const dollarPy = getPyDollar();
  const data = getData({ url: "/history_price" });

  return (
    <section className="container-table max-w-[1200px] overflow-hidden relative">
      <div className="flex justify-between items-centerF mb-6 ">
        <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
          Historial de Precios
        </h4>
        <div className="flex items-center gap-6"></div>
      </div>
      <Suspense fallback={<SkeletonTable />}>
        <HookDataContext>
          <GetPromise data={data} dollarPy={dollarPy} />
        </HookDataContext>
      </Suspense>
    </section>
  );
}
