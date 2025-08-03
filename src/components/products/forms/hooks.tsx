import TypeProduct from "@/app/api/products/type/typeProducts";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UseFormReset } from "react-hook-form";

export default function HooksForm({
  data,
  reset,
}: {
  data: TypeProduct | undefined;
  reset: UseFormReset<TypeProduct>;
}) {
  const { id } = useParams();
  const [disabled, setDisabled] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (data) {
      reset({
        name: data.name,
        price: data.price,
        stock: data.stock,
      });
    }
  }, [data]);
  return { id, disabled, setDisabled, router };
}
