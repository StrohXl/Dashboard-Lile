"use client";
import { useForm } from "react-hook-form";
import { use } from "react";
import { onSubmitSale } from "./services/onSubmitSale";
import { ResponseData } from "@/models";
import { Product } from "@/app/api/products/models";
import SaleHookContext, { useContextSale } from "./hooks/saleHookContext";
import FormHeaderSale from "./components/formHeaderSale";
import ListProduct from "./components/listProduct/listProduct";
import ListPayments from "./components/listPayments/listPayments";
import type { FormSale } from "./models";
import { ChangeManager } from "./components/changeManager/changeManager";

export default function FormSale({
  data,
  pyDollar,
}: {
  data: Promise<ResponseData<Product>>;
  pyDollar: Promise<number | undefined>;
}) {
  const products = use(data);
  const dollar = use(pyDollar) ?? 1;

  return (
    <SaleHookContext pyDollar={dollar} dataProducts={products.data}>
      <SaleForm />
    </SaleHookContext>
  );
}

const SaleForm = () => {
  const {
    handleSubmit,
    control,
    register,
    getValues,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormSale>({
    defaultValues: {
      payments: [
        { operation: 0, payment_amount: 0, payment_method: "efectivo Bs" },
      ],
    },
  });
  const { disabled, setDisabled, formSteps, setFormSteps } = useContextSale();
  return (
    <form
      className="grid container-table  max-w-[800px]"
      onSubmit={handleSubmit((body) =>
        onSubmitSale({ body, reset, setDisabled })
      )}
    >
      <FormHeaderSale />
      
      <div className="flex flex-col gap-4 w-full mt-6 pb-6 border-b-1 border-gray-400 ">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h4 className="font-roboto text-gray-800 font-semibold text-lg">
            Cliente
          </h4>
          <button className="btn-outlined-primary">Agregar Cliente</button>
        </div>
      </div>

      <ListPayments
        errors={errors}
        getValues={getValues}
        register={register}
        watch={watch}
        control={control}
      />

      <ChangeManager
        errors={errors}
        control={control}
        register={register}
        watch={watch}
        getValues={getValues}
      />

      <ListProduct
        watch={watch}
        getValues={getValues}
        register={register}
        control={control}
      />

      <div className="flex justify-end mt-6">
        <button disabled={disabled} className="btn-primary">
          Crear Venta
        </button>
      </div>
    </form>
  );
};
