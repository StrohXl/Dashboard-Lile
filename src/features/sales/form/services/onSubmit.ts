import { ParamValue } from "next/dist/server/request/params";
import { onSubmitSale } from "./onSubmitSale";
import { onSubmitSaleById } from "./onSubmitSaleById";
import { UseFormReset } from "react-hook-form";
import { FormSale } from "../models";
import { RefObject } from "react";

export function onSubmit({
  reload,
  setDisabled,
  setFormSteps,
  setIdSale,
  setReload,
  setTotalChanges,
  setTotalPayments,
  setTotalPrice,
  id,
  body,
  reset,
  containerInvoice,
}: {
  body: FormSale;
  id: ParamValue;
  setIdSale: (value: number) => void;
  setDisabled: (value: boolean) => void;
  setTotalPrice: (value: number) => void;
  setTotalPayments: (value: number) => void;
  setTotalChanges: (value: number) => void;
  setFormSteps: (value: number) => void;
  reload: boolean;
  setReload: (value: boolean) => void;
  reset: UseFormReset<FormSale>;
  containerInvoice: RefObject<null>;
}) {
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
      document: containerInvoice,
      setIdSale,
    });
  }
}
