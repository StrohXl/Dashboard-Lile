"use client";
import { use } from "react";
import { useForm, UseFormReturn } from "react-hook-form";

import SkeletonFormProduct from "@/features/products/forms/components/skeletonFormProduct";

import FormBodySale from "./components/formBodySale";
import FormHeaderSale from "./components/formHeaderSale";
import SaleHookContext, { useContextSale } from "./hooks/saleHookContext";
import type { FormSale } from "./models";
import { onSubmitSale } from "./services/onSubmitSale";
import { nextForm } from "./utilities";

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

  const {
    setIdSale,
    containerInvoice,
    disabled,
    setDisabled,
    formSteps,
    setFormSteps,
    totalChanges,
    totalPayments,
    dollar,
    totalPrice,
    loadingSale,
    setTotalChanges,
    setTotalPrice,
    setTotalPayments,
    id,
  } = useContextSale();

  // Form Sale

  const {
    getValues,
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { isDirty },
  } = useFormSale;

  if (loadingSale) {
    return <SkeletonFormProduct />;
  } else {
    return (
      <form
        className="grid container-table  max-w-[1200px]"
        onSubmit={handleSubmit((body) =>
          onSubmitSale({
            body,
            document: containerInvoice,
            reset,
            setDisabled,
            setFormSteps,
            setIdSale,
            setTotalChanges,
            setTotalPayments,
            setTotalPrice,
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
              onClick={() => setFormSteps(formSteps - 1)}
              className="btn-outlined-primary"
            >
              Regresar
            </button>
          )}

          <button
            disabled={disabled || (formSteps == 3 && !isDirty)}
            type={formSteps !== 3 ? "button" : "submit"}
            className={`btn-primary ms-auto disabled:opacity-50 disabled:cursor-not-allowed`}
            onClick={() =>
              nextForm({
                formSteps,
                getValues,
                setFormSteps,
                trigger,
                setValue,
                dollar,
                totalChanges,
                totalPayments,
                totalPrice,
                id,
                setTotalPayments,
              })
            }
          >
            {formSteps !== 3
              ? "Siguiente"
              : id
                ? "Actualizar Venta"
                : "Crear Venta"}
          </button>
        </div>
      </form>
    );
  }
};
