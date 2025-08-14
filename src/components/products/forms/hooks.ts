import TypeProduct from "@/app/api/products/models/product.model";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReset, UseFormSetValue, UseFormWatch } from "react-hook-form";
import { ProductPriceBsType } from "./formProduct";
import { getProduct } from "./utils";

export default function HooksForm({
  watch,
  dollar,
  setValue,
  reset,
}: {
  reset: UseFormReset<ProductPriceBsType>;
  dollar: number | undefined;
  setValue: UseFormSetValue<ProductPriceBsType>;
  watch: UseFormWatch<ProductPriceBsType>;
}) {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<TypeProduct | undefined>();
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
