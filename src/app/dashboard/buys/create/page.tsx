import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { Suspense } from "react";

import LinkArrowLeft from "@/components/dashboard/LinkArrowLeft";

import ContainerHistoryPrice from "@/features/buys/form/components/containerTableHistoryPrice";
import SkeletonFormBuy from "@/features/buys/form/components/skeletonFormBuy";
import FormBuy from "@/features/buys/form/formBuys";
import { HookBuyContext } from "@/features/buys/form/hooks/useContenxtBuy";

export default function CreateBuy() {
  const pyDollar = getPyDollar();
  return (
    <>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-800 dark:text-white font-open_sans">
          Agregar compra
        </h2>
        <LinkArrowLeft link="/dashboard/buys" />
      </div>
      <HookBuyContext>
        <section className="grid 2xl:grid-cols-[800px_400px] gap-6">
          <Suspense fallback={<SkeletonFormBuy />}>
            <FormBuy pyDollar={pyDollar} />
          </Suspense>
          <ContainerHistoryPrice dollarPy={pyDollar} />
        </section>
      </HookBuyContext>
    </>
  );
}
