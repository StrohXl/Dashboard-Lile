import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { Product } from "@/app/api/products/models";
import { getProduct } from "./services";
import { FormProduct } from "./models/form-product.model";

export default function HooksForm({
  watch,
  dollar,
  setValue,
  reset,
}: {
  reset: UseFormReset<FormProduct>;
  dollar: number | undefined;
  setValue: UseFormSetValue<FormProduct>;
  watch: UseFormWatch<FormProduct>;
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<Product | undefined>();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    // ejecutar funcion si existe el id en la pagina
    if (id) {
      getProduct({ dollar, id: Number(id), reset, setLoading, setProduct });
    } else {
      setLoading(false);
    }
  }, [id]);

  // Ver cambios en el input Price
  const fieldPrice = watch("price");

  useEffect(() => {
    // Cambiar el input priceBs cada vez que cambie el valor en el input Price
    if (dollar) {
      setValue("priceBs", fieldPrice * dollar);
    }
  }, [fieldPrice]);

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
