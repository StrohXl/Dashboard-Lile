"use client";
import { useForm } from "react-hook-form";
import TypeProduct from "@/app/api/products/models/product.model";
import HooksForm from "./hooks";
import { onSubmit } from "./utils";
import { use } from "react";
import SkeletonFormProduct from "./components/skeletonFormProduct";
import BodyFormProduct from "./components/bodyFormProduct";

export type ProductPriceBsType = TypeProduct & {
  priceBs: number;
};

export default function FormProduct({
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
}) {
  // Resolver promesa de la api pyDollar
  const dollar = use(pyDollar);

  //React-Hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<ProductPriceBsType>();

  // Variables de estado
  const { disabled, id, loading, product, router, setDisabled } = HooksForm({
    dollar,
    reset,
    setValue,
    watch,
  });

  // Obtener el producto mediante el id de la pagina

  return (
    <>
      {loading ? (
        <SkeletonFormProduct />
      ) : (
        <form
          className="flex flex-col gap-4 max-w-[450px] mt-12 !px-5 container-table"
          onSubmit={handleSubmit((body) =>
            onSubmit({ body, data: product, id, reset, router, setDisabled })
          )}
        >
          <h4 className="font-open_sans text-gray-800 font-semibold text-2xl">
            Producto
          </h4>

          <BodyFormProduct errors={errors} register={register} />

          <button
            type="submit"
            disabled={disabled}
            className="btn-primary mt-3 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
          >
            {product ? "Guardar cambios" : "Agregar"}
          </button>
        </form>
      )}
    </>
  );
}
