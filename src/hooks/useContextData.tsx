"use client";
import { Buy } from "@/models/api/buy";
import { Sale } from "@/models/api/sale";
import {
  createContext,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";

export type DataContextType = {
  disabled: boolean;
  setDisabled: (val: boolean) => void;
  selects: number[];
  setSelects: (val: number[]) => void;
  ids: number[];
  setIds: (val: number[]) => void;
  openDrawer: boolean;
  setOpenDrawer: (value: boolean) => void;
  loadingDrawer: boolean;
  setLoadingDrawer: (value: boolean) => void;
  sale: Sale | undefined;
  setSale: (value: Sale | undefined) => void;
  buy: Buy | undefined;
  setBuy: (value: Buy | undefined) => void;
  containerInvoice: RefObject<null>;
};

const UseDataContext = createContext<DataContextType | undefined>(undefined);

export function HookDataContext({ children }: { children: ReactNode }) {
  const [disabled, setDisabled] = useState(false);
  const [selects, setSelects] = useState<number[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [openDrawer, setOpenDrawer] = useState<boolean>(false);
  const [loadingDrawer, setLoadingDrawer] = useState<boolean>(false);
  const [sale, setSale] = useState<Sale | undefined>();
  const [buy, setBuy] = useState<Buy | undefined>();
  const containerInvoice = useRef(null);

  return (
    <UseDataContext.Provider
      value={{
        buy,
        setBuy,
        containerInvoice,
        sale,
        setSale,
        loadingDrawer,
        setLoadingDrawer,
        openDrawer,
        setOpenDrawer,
        disabled,
        selects,
        setSelects,
        setDisabled,
        ids,
        setIds,
      }}
    >
      {children}
    </UseDataContext.Provider>
  );
}

export function useDataContext() {
  const context = useContext(UseDataContext);
  if (!context) {
    throw new Error("useDataContext debe usarse dentro de UseDataContext");
  }
  return context;
}
