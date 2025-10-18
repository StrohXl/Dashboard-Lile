import getPyDollar from "@/fetch/pydolar/getPyDolar";
import { Suspense } from "react";

import SkeletonFormProduct from "@/features/products/forms/components/skeletonFormProduct";
import FormSale from "@/features/sales/form/formSale";
import LinkArrowLeft from "@/components/dashboard/LinkArrowLeft";
export default async function CreateSale() {
  const pyDollar = getPyDollar();

  return (
    <>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold font-open_sans">Agregar Venta</h2>
        <LinkArrowLeft link="/dashboard/sales" />
      </div>
      <section>
        <Suspense fallback={<SkeletonFormProduct />}>
          <FormSale pyDollar={pyDollar} />
        </Suspense>
      </section>
    </>
  );
}
