"use client";
import { useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { UseFormReset } from "react-hook-form";

import { FormSale, SaleSchemaHook } from "../models";
import { getSale } from "../services/getSale";

const UseSaleContext = createContext<SaleSchemaHook | undefined>(undefined);

export default function SaleHookContext({
  children,
  pyDollar,
  reset,
}: {
  pyDollar: number;
  children: ReactNode;
  reset: UseFormReset<FormSale>;
}) {
  // Hooks FormSale ID
  const { id } = useParams();
  const [loadingSale, setLoadingSale] = useState<boolean>(true);

  // Hooks FormSale
  const [dollar, setDollar] = useState<number>(pyDollar);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalChanges, setTotalChanges] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [formSteps, setFormSteps] = useState<number>(0);
  const [reload, setReload] = useState<boolean>(true);
  const [idSale, setIdSale] = useState<number>(0);
  const containerInvoice = useRef(null);

  useEffect(() => {
    if (id) {
      getSale({
        id,
        dollar,
        reset,
        setLoadingSale,
        setTotalPayments,
        setTotalPrice,
        setTotalChanges,
        setIdSale,
      });
    } else {
      setLoadingSale(false);
    }
  }, [reload]);

  return (
    <UseSaleContext.Provider
      value={{
        idSale,
        setIdSale,
        containerInvoice,
        disabled,
        setDisabled,
        dollar,
        setDollar,
        totalPrice,
        setTotalPrice,
        totalPayments,
        setTotalPayments,
        totalChanges,
        setTotalChanges,
        formSteps,
        setFormSteps,
        id,
        loadingSale,
        setLoadingSale,
        reload,
        setReload,
      }}
    >
      {children}
    </UseSaleContext.Provider>
  );
}

export function useContextSale() {
  const context = useContext(UseSaleContext);
  if (!context) {
    throw new Error("useDataContext debe usarse dentro de UseDataContext");
  }
  return context;
}
