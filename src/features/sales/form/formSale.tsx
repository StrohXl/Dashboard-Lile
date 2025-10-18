"use client";
import { use } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

import SkeletonFormProduct from "@/features/products/forms/components/skeletonFormProduct";

import FormBodySale from "./components/formBodySale";
import FormHeaderSale from "./components/formHeaderSale";
import SaleHookContext, { useContextSale } from "./hooks/saleHookContext";
import type { FormSale } from "./models";
import { nextForm } from "./utilities";
import {
  HiOutlineArrowSmallLeft,
  HiOutlineArrowSmallRight,
} from "react-icons/hi2";
import { onSubmit } from "./services/onSubmit";

export default function FormSale({
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
}) {
  const dollar = use(pyDollar) ?? 1;

  const useFormSale = useForm<FormSale>({
    defaultValues: {
      payments: [
        {
          payment_amount: 0,
          payment_method: "transferencia",
          id: 0,
        },
      ],
      client: {
        id: 0,
      },
    },
    mode: "onChange",
  });

  return (
    <SaleHookContext reset={useFormSale.reset} pyDollar={dollar}>
      <SaleForm useFormSale={useFormSale} />
    </SaleHookContext>
  );
}

const SaleForm = ({
  useFormSale,
}: {
  useFormSale: UseFormReturn<FormSale>;
}) => {
  // Context Sale

  const contextSale = useContextSale();

  const { loadingSale, id, formSteps, setFormSteps, disabled } = contextSale;

  // Form Sale

  const {
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useFormSale;

  if (loadingSale) return <SkeletonFormProduct />;
  else {
    return (
      <form
        className="grid container-table  max-w-[1200px]"
        onSubmit={handleSubmit((body) =>
          onSubmit({
            body,
            reset,
            contextSale,
          })
        )}
      >
        <FormHeaderSale />

        <div className="max-h-[300px] xl:max-h-full pe-4 xl:pe-0  overflow-auto">
          <FormBodySale useFormSale={useFormSale} />
        </div>

        <div className="flex justify-between mt-6">
          {formSteps !== 0 && (
            <button
              type="button"
              onClick={() => setFormSteps((value) => value - 1)}
              className="btn-outlined-primary"
            >
              <HiOutlineArrowSmallLeft size={20} />
              Regresar
            </button>
          )}

          <button
            disabled={disabled || (formSteps == 3 && !isDirty)}
            type={formSteps !== 3 ? "button" : "submit"}
            className={`btn-primary ms-auto disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() =>
              nextForm({
                contextSale,
                useFormSale,
              })
            }
          >
            {formSteps !== 3 ? (
              <>
                Siguiente <HiOutlineArrowSmallRight size={20} />
              </>
            ) : id ? (
              "Actualizar Venta"
            ) : (
              "Crear Venta"
            )}
          </button>
        </div>
      </form>
    );
  }
};
