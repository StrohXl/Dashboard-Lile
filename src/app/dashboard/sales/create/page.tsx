import getPyDollar from "@/fetch/pydolar/getPyDolar";
import Link from "next/link";
import { Suspense } from "react";
import { FaChevronLeft } from "react-icons/fa6";


import SkeletonFormProduct from "@/features/products/forms/components/skeletonFormProduct";
import FormSale from "@/features/sales/form/formSale";
export default async function CreateSale() {
  const pyDollar = getPyDollar();

  return (
    <>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-800 font-open_sans">
          Agregar Venta
        </h2>
        <Link
          href={"/dashboard/sales"}
          className="flex rounded-full text-primary items-center justify-center border-2 hover:text-primary-ligth hover:border-primary-ligth  transition-colors  duration-300 border-primary w-10 h-10"
        >
          <FaChevronLeft size={20} />
        </Link>
      </div>
      <section>
        <Suspense fallback={<SkeletonFormProduct />}>
          <FormSale pyDollar={pyDollar} />
        </Suspense>
      </section>
    </>
  );
}
