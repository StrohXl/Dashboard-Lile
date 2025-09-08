"use client";
import { useForm } from "react-hook-form";
import HooksForm from "./hooks";
import { use } from "react";
import SkeletonFormProduct from "./components/skeletonFormProduct";
import BodyFormProduct from "./components/bodyFormProduct";
import { onSubmit } from "./services/on-submit-product.service";
import type { FormProduct } from "./models/form-product.model";

export default function FormProduct({
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
}) {
  // Resolver promesa de la api pyDollar
  const dollar = use(pyDollar) ?? 0;

  //React-Hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors, isDirty },
  } = useForm<FormProduct>();

  // Variables de estado
  const { disabled, id, loading, product, router, setDisabled } = HooksForm({
    dollar,
    reset,
    isDirty,
    getValues,
  });

  // Obtener el producto mediante el id de la pagina

  return (
    <>
      {loading ? (
        <SkeletonFormProduct />
      ) : (
        <form
          className="flex flex-col gap-4 max-w-[600px] mt-12 !px-5 container-table"
          onSubmit={handleSubmit((body) =>
            onSubmit({ body, id, router, setDisabled })
          )}
        >
          <h4 className="font-open_sans mb-4 text-gray-800 font-semibold text-2xl">
            Producto
          </h4>

          <BodyFormProduct
            dollar={dollar}
            errors={errors}
            setValue={setValue}
            register={register}
          />

          <button
            type="submit"
            disabled={disabled}
            className="btn-primary ms-auto mt-3 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
          >
            {product ? "Guardar cambios" : `Agregar`}
          </button>
        </form>
      )}
    </>
  );
}
