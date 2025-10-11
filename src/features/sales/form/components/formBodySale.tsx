import Invoice from "@/documents/invoice";
import { useFieldArray, UseFormReturn } from "react-hook-form";

import { CreateClient } from "@/models/api/client";

import { useContextSale } from "../hooks/saleHookContext";
import { FormSale } from "../models";
import SectionClient from "./client/sectionClient";
import ListPaymentsAndChanges from "./listPaymentsAndChanges/listPaymentsAndChanges";
import ListProduct from "./listProduct/listProduct";

export default function FormBodySale({
  useFormSale,
}: {
  useFormSale: UseFormReturn<FormSale>;
}) {
  const {
    control,
    watch,
    formState: { errors },
    register,
    reset,
    setValue,
    getValues,
  } = useFormSale;

  const { formSteps, dollar, totalPrice, containerInvoice, idSale } =
    useContextSale();

  const {
    fields: paymentFields,
    prepend: paymentPrepend,
    remove: paymentRemove,
  } = useFieldArray({
    name: "payments",
    control,
  });

  const {
    fields: changeFields,
    prepend: changePrepend,
    remove: changeRemove,
  } = useFieldArray({
    name: "change_manager",
    control,
  });

  const client: CreateClient = {
    ci: Number(watch("client.ci")),
    last_name: watch("client.last_name"),
    name: watch("client.name"),
  };

  const products = watch("list_products");

  const options = [1, 2, 3];

  return (
    <>
      {formSteps == 0 && (
        <SectionClient
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
          reset={reset}
        />
      )}
      {formSteps == 1 && (
        <ListProduct
          errors={errors}
          watch={watch}
          getValues={getValues}
          register={register}
          control={control}
        />
      )}
      {formSteps == 2 && (
        <div className="grid xl:grid-cols-[1fr_1px_1fr] gap-6 mt-6 pb-6">
          {options.map((item, index) => {
            if (index == 1) {
              return (
                <div
                  key={index}
                  className=" w-full h-[1px] xl:h-full xl:w-[1px] bg-gray-400"
                ></div>
              );
            } else {
              return (
                <div key={index}>
                  <ListPaymentsAndChanges
                    errors={errors}
                    fields={index == 0 ? paymentFields : changeFields}
                    getValues={getValues}
                    option={index == 0 ? "payments" : "changes"}
                    prepend={index == 0 ? paymentPrepend : changePrepend}
                    register={register}
                    remove={index == 0 ? paymentRemove : changeRemove}
                    watch={watch}
                    setValue={setValue}
                  />
                </div>
              );
            }
          })}
        </div>
      )}
      {formSteps == 3 && (
        <div className="max-w-[400px] mx-auto">
          <Invoice
            containerInvoice={containerInvoice}
            totalPrice={totalPrice}
            products={products}
            client={client}
            dollar={dollar}
            idDocument={idSale}
          />
        </div>
      )}
    </>
  );
}
