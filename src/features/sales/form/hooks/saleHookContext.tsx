"use client";
import { Product } from "@/app/api/products/models";
import { createContext, ReactNode, useContext, useState } from "react";

type SaleSchemaHook = {
  search: string;
  setSearch: (value: string) => void;
  products: Product[];
  setProducts: (value: Product[]) => void;
  open: boolean;
  setOpen: (value: boolean) => void;
  disabled: boolean;
  setDisabled: (value: boolean) => void;
  dollar: number;
  setDollar: (value: number) => void;
  totalPrice: number;
  setTotalPrice: (value: number) => void;
  totalPayments: number;
  setTotalPayments: (value: number) => void;
  totalChanges: number;
  setTotalChanges: (value: number) => void;
  options: Product[];
  setOptions: (value: Product[]) => void;
  formSteps: number;
  setFormSteps: (value: number) => void;
};

const UseSaleContext = createContext<SaleSchemaHook | undefined>(undefined);

export default function SaleHookContext({
  children,
  dataProducts,
  pyDollar,
}: {
  pyDollar: number;
  children: ReactNode;
  dataProducts: Product[];
}) {
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(dataProducts);
  const [options, setOptions] = useState<Product[]>(dataProducts);
  const [dollar, setDollar] = useState<number>(pyDollar);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [totalChanges, setTotalChanges] = useState<number>(0);
  const [totalPayments, setTotalPayments] = useState<number>(0);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [formSteps, setFormSteps] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);

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
