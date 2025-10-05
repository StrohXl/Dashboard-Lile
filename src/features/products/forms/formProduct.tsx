"use client";
import { useForm } from "react-hook-form";
import HooksForm from "./hooks";
import { use, useState } from "react";
import SkeletonFormProduct from "./components/skeletonFormProduct";
import BodyFormProduct from "./components/bodyFormProduct";
import { onSubmit } from "./services/on-submit-product.service";
import type { FormProduct } from "./models/form-product.model";
import TableBodyHistoryPrice from "@/features/history_price/table/components/tableBodyHistoryPrice";
import { HistoryPrice } from "@/app/api/history_price/models/historyPrice.model";
import axios from "axios";
import { IoClose } from "react-icons/io5";
import NotHave from "@/components/dashboard/tables/components/notHave";
import { MdHistory } from "react-icons/md";
import SkeletonTable from "@/components/dashboard/skeleton/skeletonTable";

export default function FormProduct({
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
}) {
  // IVA
  const IVA = 16;

  // Resolver promesa de la api pyDollar
  const dollar = use(pyDollar) ?? 0;

  //React-Hook-Form
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors, isDirty },
  } = useForm<FormProduct>({
    defaultValues: {
      price: 0,
      type_of_currency: 'dollar',
      iva: "false",
    },
  });

  // Variables de estado
  const { disabled, id, loading, product, router, setDisabled } = HooksForm({
    reset,
    isDirty,
    getValues,
    IVA,
  });

  const [historyPrice, setHistoryPrice] = useState<HistoryPrice[]>([]);

  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);

  // Obtener el producto mediante el id de la pagina

  const getHistory = async () => {
    setLoadingHistory(true);
    try {
      const { data }: { data: { data: HistoryPrice[] } } = await axios.get(
        `/api/history_price/${id}`
      );
      setHistoryPrice(data.data);
    } catch (error) {
      console.log(error);
      setHistoryPrice([]);
    }
    setLoadingHistory(false);
  };

  const openHistory = () => {
    getHistory();
    setShowHistory(true);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[600px_400px]">
      {loading ? (
        <SkeletonFormProduct />
      ) : (
        <form
          className="max-w-[600px] !px-5 container-table"
          onSubmit={handleSubmit((body) =>
            onSubmit({ body, id, router, setDisabled, iva: IVA })
          )}
        >
          <div className="flex justify-between items-center gap-4">
            <h4 className="font-open_sans mb-4 text-gray-800 font-semibold text-2xl">
              Producto
            </h4>
          </div>
          <div className="flex items-center mb-4 gap-4">
            {id && (
              <button
                type="button"
                onClick={openHistory}
                className={`text-sm !px-2 ${"btn-outlined-primary hover:!text-primary-ligth hover:!bg-white hover:!border-primary-ligth"}`}
              >
                Historial de Precio
              </button>
            )}
          </div>
          <BodyFormProduct
            dollar={dollar}
            errors={errors}
            setValue={setValue}
            watch={watch}
            register={register}
            iva={IVA}
          />

          <button
            type="submit"
            disabled={disabled}
            className="btn-primary mt-6 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
          >
            {product ? "Guardar cambios" : `Agregar Producto`}
          </button>
        </form>
      )}
      {showHistory && (
        <div>
          <section className="container-table max-w-[1200px] h-fi overflow-hidden relative">
            <div className="flex justify-between items-centerF mb-6 ">
              <h4 className="font-open_sans text-2xl font-semibold text-gray-800">
                Historial de Precios
              </h4>
              <div className="flex items-center gap-6">
                <button
                  className="transition-colors hover:text-primary cursor-pointer  duration-300 text-gray-400"
                  type="button"
                  onClick={() => setShowHistory(false)}
                >
                  <IoClose size={25} />
                </button>
              </div>
            </div>
            {loadingHistory ? (
              <SkeletonTable />
            ) : historyPrice.length == 0 ? (
              <NotHave
                size={100}
                height={200}
                message="No se encontro un historial"
                icon={MdHistory}
              />
            ) : (
              <TableBodyHistoryPrice data={historyPrice} dollarPy={dollar} />
            )}
          </section>
        </div>
      )}
    </div>
  );
}
