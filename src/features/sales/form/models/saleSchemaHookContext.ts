import { ParamValue } from "next/dist/server/request/params";
import { RefObject } from "react";

export type SaleSchemaHook = {
  idSale: number;
  setIdSale: (value: number) => void;
  id: ParamValue;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
  loadingSale: boolean;
  setLoadingSale: (value: boolean) => void;
  dollar: number;
  setDollar: (value: number) => void;
  totalPrice: number;
  setTotalPrice: (value: number) => void;
  totalPayments: number;
  setTotalPayments: (value: number) => void;
  totalChanges: number;
  setTotalChanges: (value: number) => void;
  formSteps: number;
  setFormSteps: (value: number) => void;
  reload: boolean;
  setReload: (value: boolean) => void;
  containerInvoice: RefObject<null>;
};
