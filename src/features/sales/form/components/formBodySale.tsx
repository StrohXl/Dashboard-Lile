import Invoice from "@/documents/invoice";
import { UseFormReturn } from "react-hook-form";

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
  const { watch } = useFormSale;

  const { formSteps, dollar, totalPrice, containerInvoice, idSale } =
    useContextSale();

  const client: CreateClient = {
    ci: Number(watch("client.ci")),
    last_name: watch("client.last_name"),
    name: watch("client.name"),
  };

  const products = watch("list_products");

  return (
    <>
      {formSteps == 0 && <SectionClient useFormSale={useFormSale} />}
      {formSteps == 1 && <ListProduct useFormSale={useFormSale} />}
      {formSteps == 2 && <ListPaymentsAndChanges useFormSale={useFormSale} />}
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
