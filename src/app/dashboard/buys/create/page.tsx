import SkeletonFormBuy from "@/components/buys/form/components/skeletonFormBuy";
import FormBuy from "@/components/buys/form/formBuys";
import getData from "@/fetch/data/getData";
import Link from "next/link";
import { Suspense } from "react";
import { FaChevronLeft } from "react-icons/fa6";

export default function CreateBuy() {
  const data = getData({
    url: "/products",
  });
  return (
    <>
      <div className="flex mb-6 items-center gap-12">
        <h2 className="text-4xl font-semibold  text-gray-700 font-open_sans">
          Agregar Compra
        </h2>
        <Link
          href={"/dashboard/buys"}
          className="flex rounded-full text-gray-700 items-center justify-center border-2 hover:text-primary hover:border-primary transition-colors  duration-300 border-gray-700 w-[30px] h-[30px]"
        >
          <FaChevronLeft size={13} />
        </Link>
      </div>
      <section>
        <Suspense fallback={<SkeletonFormBuy />}>
          <FormBuy data={data} />
        </Suspense>
      </section>
    </>
  );
}
