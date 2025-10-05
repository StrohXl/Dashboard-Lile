"use client";
import { createContext, ReactNode, useContext, useState } from "react";

export type DataContextType = {
  disabled: boolean;
  setDisabled: (val: boolean) => void;
  selects: number[];
  setSelects: (val: number[]) => void;
  ids: number[];
  setIds: (val: number[]) => void;
};

const UseDataContext = createContext<DataContextType | undefined>(undefined);

export function HookDataContext({ children }: { children: ReactNode }) {
  const [disabled, setDisabled] = useState(false);
  const [selects, setSelects] = useState<number[]>([]);
  const [ids, setIds] = useState<number[]>([]);

  return (
    <UseDataContext.Provider
      value={{
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
