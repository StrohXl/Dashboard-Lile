import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  UseFormGetValues,
  UseFormReset,
} from "react-hook-form";
import { Product } from "@/app/api/products/models";
import { getProduct } from "./services";
import { FormProduct } from "./models/form-product.model";

export default function HooksForm({
  dollar,
  reset,
  getValues,
  isDirty,
}: {
  reset: UseFormReset<FormProduct>;
  dollar: number | undefined;
  getValues: UseFormGetValues<FormProduct>;
  isDirty: boolean;
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | undefined>();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // ejecutar funcion si existe el id en la pagina
    if (id) {
      setDisabled(true);
      getProduct({ dollar, id: Number(id), reset, setLoading, setProduct });
    } else {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      if (isDirty) {
        setDisabled(false);
      } else if (
        product?.name === getValues("name") &&
        product?.price == getValues("price") &&
        product?.stock == getValues("stock")
      ) {
        setDisabled(true);
      }
    }
  }, [isDirty]);

  return {
    id,
    disabled,
    setDisabled,
    router,
    loading,
    setLoading,
    product,
    setProduct,
  };
}
