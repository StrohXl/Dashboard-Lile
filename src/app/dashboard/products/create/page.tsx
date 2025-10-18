import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { Suspense } from "react";

import SkeletonFormProduct from "@/features/products/forms/components/skeletonFormProduct";
import FormProduct from "@/features/products/forms/formProduct";
import LinkArrowLeft from "@/components/dashboard/LinkArrowLeft";
export default async function CreateProducts() {
  const pyDollar = getPyDollar();
  return (
    <>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-800 dark:text-white font-open_sans">
          Agregar Producto
        </h2>
        <LinkArrowLeft link={"/dashboard/products"} />
      </div>
      <section>
        <Suspense fallback={<SkeletonFormProduct />}>
          <FormProduct pyDollar={pyDollar} />
        </Suspense>
      </section>
    </>
  );
}
