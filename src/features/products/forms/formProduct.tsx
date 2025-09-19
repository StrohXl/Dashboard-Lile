"use client";
import { useForm } from "react-hook-form";
import HooksForm from "./hooks";
import { Suspense, use, useEffect, useState } from "react";
import SkeletonFormProduct from "./components/skeletonFormProduct";
import BodyFormProduct from "./components/bodyFormProduct";
import { onSubmit } from "./services/on-submit-product.service";
import type { FormProduct } from "./models/form-product.model";
import TableBodyHistoryPrice from "@/features/history_price/table/components/tableBodyHistoryPrice";
import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";
import { HistoryPrice } from "@/app/api/history_price/models/historyPrice.model";
import axios from "axios";
import { ResponseData } from "@/models";

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

  const [historyPrice, setHistoryPrice] =
    useState<Promise<{ data: ResponseData<{ data: HistoryPrice; pages: number }> }>>(axios.get(`/api/history_price/${id}`));

  const [option, setOption] = useState(0);

  // Obtener el producto mediante el id de la pagina

  useEffect(() => {
    if (option == 1 && id) {
      setHistoryPrice(axios.get(`/api/history_price/${id}`));
    }
  }, [option, id]);

  return (
    <div className="grid gap-6 lg:grid-cols-[600px_400px]">
      {loading ? (
        <SkeletonFormProduct />
      ) : (
        <form
          className="max-w-[600px] !px-5 container-table"
          onSubmit={handleSubmit((body) =>
            onSubmit({ body, id, router, setDisabled })
          )}
        >
          <div className="flex justify-between items-center gap-4">
            <h4 className="font-open_sans mb-4 text-gray-800 font-semibold text-2xl">
              Producto
            </h4>
          </div>
          <div className="flex items-center mb-4 gap-4">
            <button
              type="button"
              onClick={() => setOption((prev) => (prev == 1 ? 0 : 1))}
              className={`text-sm !px-2 ${
                option == 1
                  ? "btn-primary"
                  : "btn-outlined-primary hover:!text-primary-ligth hover:!bg-white hover:!border-primary-ligth"
              }`}
            >
              Historial de Precio
            </button>
          </div>
          <BodyFormProduct
            dollar={dollar}
            errors={errors}
            setValue={setValue}
            register={register}
          />

          <button
            type="submit"
            disabled={disabled}
            className="btn-primary ms-auto mt-12 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
          >
            {product ? "Guardar cambios" : `Agregar`}
          </button>
        </form>
      )}
      {option == 1 && (
        <div>
          <section className="container-table max-w-[1200px] overflow-hidden relative">
            <div className="flex justify-between items-centerF mb-6 ">
              <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
                Historial de Precios
              </h4>
              <div className="flex items-center gap-6"></div>
            </div>
            <Suspense fallback={<SkeletonTable />}>
              <TableBodyHistoryPrice data={historyPrice} dollarPy={pyDollar} />
            </Suspense>
          </section>
        </div>
      )}
    </div>
  );
}
