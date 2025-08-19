"use client";
import { createContext, ReactNode, useContext, useState } from "react";
import {
  useRowSelect,
  SelectClickTypes,
  Select,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "../tables/utils";
import { Data } from "@/models";
export type DataContextType = {
  disabled: boolean;
  setDisabled: (val: boolean) => void;
  selects: number[];
  setSelects: (val: number[]) => void;
  ids: number[];
  select: Select<never>;
  setIds: (val: number[]) => void;
};

const UseDataContext = createContext<DataContextType | undefined>(undefined);

export function HookDataContext({
  children,
  data,
}: {
  children: ReactNode;
  data: Data;
}) {
  const [disabled, setDisabled] = useState(false);
  const [selects, setSelects] = useState<number[]>([]);
  const [ids, setIds] = useState<number[]>([]);

  const select = useRowSelect(
    { nodes: data.data },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  return (
    <UseDataContext.Provider
      value={{
        disabled,
        selects,
        setSelects,
        select,
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
