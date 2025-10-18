import { UseFormReset } from "react-hook-form";

import { FormSale, SaleSchemaHook } from "../models";
import { onSubmitSale } from "./onSubmitSale";
import { onSubmitSaleById } from "./onSubmitSaleById";

export function onSubmit({
  body,
  reset,
  contextSale,
}: {
  body: FormSale;
  reset: UseFormReset<FormSale>;
  contextSale: SaleSchemaHook;
}) {
  const { id } = contextSale;

  if (id) {
    onSubmitSaleById({
      body,
      contextSale,
    });
  } else {
    onSubmitSale({
      body,
      reset,
      contextSale,
    });
  }
}
