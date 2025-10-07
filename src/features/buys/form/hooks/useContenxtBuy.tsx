"use client";
import { createContext, ReactNode, useContext, useState } from "react";

import { HistoryPrice } from "../../../../app/api/history_price/models/historyPrice.model";

export type BuyContextType = {
  showHistory: boolean;
  setShowHistory: (value: boolean) => void;
  historyPrice: HistoryPrice[];
  setHistoryPrice: (value: HistoryPrice[]) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
  indexFields: number;
  setIndexFields: (value: number) => void;
};

const UseDataBuyContext = createContext<BuyContextType | undefined>(undefined);

export function HookBuyContext({ children }: { children: ReactNode }) {
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [historyPrice, setHistoryPrice] = useState<HistoryPrice[]>([]);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [indexFields, setIndexFields] = useState<number>(0);

  return (
    <UseDataBuyContext.Provider
      value={{
        openModal,
        setOpenModal,
        showHistory,
        setShowHistory,
        loading,
        setLoading,
        historyPrice,
        setHistoryPrice,
        indexFields,
        setIndexFields,
      }}
    >
      {children}
    </UseDataBuyContext.Provider>
  );
}

export function useContextBuy() {
  const context = useContext(UseDataBuyContext);
  if (!context) {
    throw new Error("useContextBuy debe usarse dentro de UseDataBuyContext");
  }
  return context;
}
