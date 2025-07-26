import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import TypeParams from "../types/typeParams";
import getPyDolar from "@/fetchs/pydolar/getPyDolar";
import getProducts from "@/fetchs/products/getProducts";
import { TypeData } from "@/types/data";

export type ProductsContextType = {
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
  fetchProducts: (params?: TypeParams) => void;
};

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined
);

export function HooksTableProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState<number>(1);
  const [selects, setSelects] = useState<number[]>([]);
  const [data, setData] = useState<TypeData>({
    products: [],
    pages: 0,
  });
  const [pyDolar, setPyDolar] = useState<number>(0);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async (params?: TypeParams) => {
    const data = await getProducts(params);
    setData(data);
  };

  const loadingFecthProducts = async (params?: TypeParams) => {
    setLoading(true);
    await fetchProducts(params);
    setLoading(false);
  };

  const fetchPyDolar = async () => {
    const res = await getPyDolar();
    if (typeof res == "number") {
      setPyDolar(res);
    }
  };

  useEffect(() => {
    loadingFecthProducts();
    fetchPyDolar();
  }, []);

  return (
    <ProductsContext.Provider
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
        fetchProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error(
      "useProductsContext debe usarse dentro de ProductsProvider"
    );
  }
  return context;
}
