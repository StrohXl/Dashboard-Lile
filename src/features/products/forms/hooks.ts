import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormGetValues, UseFormReset, UseFormWatch } from "react-hook-form";

import { Product } from "@/models/api/product";

import { FormProduct } from "./models/form-product.model";
import { getProduct } from "./services";

export default function HooksForm({
  reset,
  getValues,
  isDirty,
  IVA,
  watch,
}: {
  reset: UseFormReset<FormProduct>;
  getValues: UseFormGetValues<FormProduct>;
  isDirty: boolean;
  IVA: number;
  watch: UseFormWatch<FormProduct>;
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | undefined>();
  const [disabled, setDisabled] = useState(false);
  const [iva, setIva] = useState<number>(IVA);
  const router = useRouter();

  useEffect(() => {
    // ejecutar funcion si existe el id en la pagina
    if (id) {
      setDisabled(true);
      getProduct({
        id: Number(id),
        reset,
        setLoading,
        setProduct,
        iva,
      });
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const productIva = product?.iva ? "true" : "false";
    if (id) {
      if (isDirty || productIva !== watch("iva")) {
        setDisabled(false);
      } else if (
        product?.name === getValues("name") &&
        product?.price == getValues("price") &&
        product?.stock == getValues("stock")
      ) {
        setDisabled(true);
      }
    }
  }, [isDirty, watch("iva")]);

  return {
    id,
    disabled,
    setDisabled,
    router,
    loading,
    setLoading,
    product,
    setProduct,
    setIva,
  };
}
