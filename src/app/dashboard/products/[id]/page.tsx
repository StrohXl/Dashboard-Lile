import getPyDollar from "@/fetch/pydolar/getPyDolar";

import FormProduct from "@/features/products/forms/formProduct";
import LinkArrowLeft from "@/components/dashboard/LinkArrowLeft";
export default function ProductId() {
  const pyDollar = getPyDollar();

  return (
    <>
      <div className="flex mb-10 items-center gap-12">
        <h2 className="text-5xl font-semibold  text-gray-800 dark:text-white font-open_sans">
          Producto
        </h2>
        <LinkArrowLeft link={"/dashboard/products"} />
      </div>
      <FormProduct pyDollar={pyDollar} />
    </>
  );
}
