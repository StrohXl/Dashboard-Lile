import SkeletonFormProduct from "@/components/products/forms/components/skeletonFormProduct";
import FormProduct from "@/components/products/forms/formProduct";
import getPyDollar from "@/fetchs/pydolar/getPyDolar";
import Link from "next/link";
import { Suspense } from "react";
import { FaChevronLeft } from "react-icons/fa6";
export default async function CreateProducts() {
  const pyDollar = getPyDollar();
  return (
    <>
      <div className="flex mb-6 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-700 font-open_sans">
          Agregar Producto
        </h2>
        <Link
          href={"/dashboard/products"}
          className="flex rounded-full text-primary items-center justify-center border-2 hover:text-primary-ligth hover:border-primary-ligth  transition-colors  duration-300 border-primary w-10 h-10"
        >
          <FaChevronLeft size={20} />
        </Link>
      </div>
      <section>
        <Suspense fallback={<SkeletonFormProduct />}>
          <FormProduct pyDollar={pyDollar} />
        </Suspense>
      </section>
    </>
  );
}
