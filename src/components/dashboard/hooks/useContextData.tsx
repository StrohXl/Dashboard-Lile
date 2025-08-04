"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import getPyDolar from "@/fetchs/pydolar/getPyDolar";
import { TypeData } from "@/types/data";
import getData from "@/fetchs/data/getData";
import TypeParams from "@/types/typeParams";

export type DataContextType = {
  data: TypeData;
  setData: (val: TypeData) => void;
  pyDolar: number;
  disabled: boolean;
  setDisabled: (val: boolean) => void;
  loading: boolean;
  selects: number[];
  setSelects: (page: number[]) => void;
  setPage: (val: number) => void;
  page: number;
  setLoading: (val: boolean) => void;
  fetchData: (params?: TypeParams) => void;
};

const UseDataContext = createContext<DataContextType | undefined>(undefined);

export function HookDataContext({
  apiUrl,
  children,
}: {
  apiUrl: string;
  children: ReactNode;
}) {
  const [page, setPage] = useState<number>(1);
  const [selects, setSelects] = useState<number[]>([]);
  const [data, setData] = useState<TypeData>({
    data: [],
    pages: 0,
  });
  const [pyDolar, setPyDolar] = useState<number>(0);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async (params?: TypeParams) => {
    const data = await getData(apiUrl, params);
    console.log(data);
    setData(data);
  };

  const loadingFecthData = async (params?: TypeParams) => {
    setLoading(true);
    await fetchData(params);
    setLoading(false);
  };

  const fetchPyDolar = async () => {
    const res = await getPyDolar();
    if (typeof res == "number") {
      setPyDolar(res);
    }
  };

  useEffect(() => {
    loadingFecthData();
    fetchPyDolar();
  }, []);

  return (
    <UseDataContext.Provider
      value={{
        page,
        setPage,
        selects,
        setSelects,
        data,
        loading,
        disabled,
        pyDolar,
        setData,
        setDisabled,
        setLoading,
        fetchData,
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
