import getPyDollar from "@/fetch/pydolar/getPyDolar";
import Link from "next/link";
import { Suspense } from "react";
import { FaChevronLeft } from "react-icons/fa6";


import ContainerHistoryPrice from "@/features/buys/form/components/containerTableHistoryPrice";
import SkeletonFormBuy from "@/features/buys/form/components/skeletonFormBuy";
import FormBuy from "@/features/buys/form/formBuys";
import { HookBuyContext } from "@/features/buys/form/hooks/useContenxtBuy";

export default function CreateBuy() {
  const pyDollar = getPyDollar();
  return (
    <>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-800 font-open_sans">
          Agregar compra
        </h2>
        <Link
          href={"/dashboard/buys"}
          className="flex rounded-full text-gray-700 items-center justify-center border-2 hover:text-primary hover:border-primary transition-colors  duration-300 border-gray-700 w-[30px] h-[30px]"
        >
          <FaChevronLeft size={13} />
        </Link>
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
