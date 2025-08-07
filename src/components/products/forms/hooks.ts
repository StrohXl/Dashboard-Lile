import TypeProduct from "@/app/api/products/type/typeProducts";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {  useState } from "react";

export default function HooksForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<TypeProduct | undefined>();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();

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
