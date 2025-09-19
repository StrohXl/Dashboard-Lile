"use client";
import { Product } from "@/app/api/products/models";
import { useParams } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
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
  const [search, setSearch] = useState<string | number>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [options, setOptions] = useState<Product[]>([]);
  const [dollar, setDollar] = useState<number>(pyDollar);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalChanges, setTotalChanges] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [formSteps, setFormSteps] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [reload, setReload] = useState<boolean>(true);

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
      });
    } else {
      setLoadingSale(false);
    }
  }, [reload]);

  return (
    <UseSaleContext.Provider
      value={{
        search,
        setSearch,
        products,
        setProducts,
        disabled,
        setDisabled,
        open,
        setOpen,
        dollar,
        setDollar,
        totalPrice,
        setTotalPrice,
        options,
        setOptions,
        totalPayments,
        setTotalPayments,
        totalChanges,
        setTotalChanges,
        formSteps,
        setFormSteps,
        loading,
        setLoading,
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
