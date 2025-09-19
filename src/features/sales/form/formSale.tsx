"use client";
import {
  Control,
  FieldErrors,
  useForm,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormTrigger,
  UseFormWatch,
} from "react-hook-form";

import { use } from "react";
import { onSubmitSale } from "./services/onSubmitSale";
import SaleHookContext, { useContextSale } from "./hooks/saleHookContext";
import FormHeaderSale from "./components/formHeaderSale";
import FormBodySale from "./components/formBodySale";
import type { FormSale } from "./models";
import { nextForm } from "./utilities";
import SkeletonFormProduct from "@/features/products/forms/components/skeletonFormProduct";
import { onSubmitSaleById } from "./services/onSubmitSaleById";

export default function FormSale({
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
}) {
  const dollar = use(pyDollar) ?? 1;

  const {
    handleSubmit,
    control,
    register,
    getValues,
    watch,
    setValue,
    reset,
    trigger,
    formState: { errors, isDirty },
  } = useForm<FormSale>({
    defaultValues: {
      payments: [
        {
          payment_amount: 0,
          payment_method: "transferencia",
          id: 0,
        },
      ],
      client:{
        id:0
      }
    },
    mode: "onChange",
  });

  return (
    <SaleHookContext reset={reset} pyDollar={dollar}>
      <SaleForm
        isDirty={isDirty}
        errors={errors}
        control={control}
        setValue={setValue}
        getValues={getValues}
        handleSubmit={handleSubmit}
        register={register}
        reset={reset}
        trigger={trigger}
        watch={watch}
      />
    </SaleHookContext>
  );
}

const SaleForm = ({
  control,
  getValues,
  handleSubmit,
  register,
  reset,
  setValue,
  trigger,
  watch,
  isDirty,
  errors,
}: {
  handleSubmit: UseFormHandleSubmit<FormSale>;
  control: Control<FormSale>;
  isDirty: boolean;
  register: UseFormRegister<FormSale>;
  getValues: UseFormGetValues<FormSale>;
  watch: UseFormWatch<FormSale>;
  reset: UseFormReset<FormSale>;
  trigger: UseFormTrigger<FormSale>;
  setValue: UseFormSetValue<FormSale>;
  errors: FieldErrors<FormSale>;
}) => {
  const {
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
    reload,
    setReload,
  } = useContextSale();

  if (loadingSale) {
    return <SkeletonFormProduct />;
  } else {
    return (
      <form
        className="grid container-table  max-w-[1200px]"
        onSubmit={handleSubmit((body) => {
          if (id) {
            onSubmitSaleById({
              body,
              id,
              setDisabled,
              setFormSteps,
              reload,
              setReload,
            });
          } else {
            onSubmitSale({
              body,
              reset,
              setDisabled,
              setFormSteps,
              setTotalChanges,
              setTotalPayments,
              setTotalPrice,
            });
          }
        })}
      >
        <FormHeaderSale />

        <div className="max-h-[300px] xl:max-h-full pe-4 xl:pe-0  overflow-auto" >
          <FormBodySale
            control={control}
            errors={errors}
            getValues={getValues}
            register={register}
            reset={reset}
            watch={watch}
            setValue={setValue}
          />
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
