"use client";
import { useForm } from "react-hook-form";
import TypeProduct from "@/app/api/products/type/typeProducts";
import FormFields from "./components/formFields";
import HooksForm from "./hooks";
import onSubmit from "./utils/onSubmit";
export default function FormProduct({
  data,
}: {
  data?: TypeProduct | undefined;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TypeProduct>();

  const { disabled, id, router, setDisabled } = HooksForm({ data, reset });

  return (
    <FormFields
      register={register}
      disabled={disabled}
      data={data}
      errors={errors}
      handleSubmit={handleSubmit}
      onSubmit={(body) =>
        onSubmit({ body, data, id, reset, router, setDisabled })
      }
    />
  );
}
