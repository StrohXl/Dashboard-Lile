"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { use } from "react";
import { FormBuyType } from "./types";
import { onSubmit } from "./utils";
import BodyFormBuy from "./components/bodyFormBuy";
import { DataBuyType } from "@/app/api/buys/type";
import HeadFormBuy from "./components/headFormBuy";
import { HookFormBuy } from "./hooks";

export default function FormBuy({ data }: { data: Promise<DataBuyType> }) {
  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
  } = useForm<FormBuyType>();

  const { disabled, setDisabled, router} = HookFormBuy();
  const { fields, prepend, remove } = useFieldArray({
    name: "products",
    control,
    rules: {
      required: "Agregue un producto",
    },
  });

  const products = use(data);

  return (
    <form
      className="flex flex-col gap-4 max-w-[750px] mt-12 !px-5 container-table"
      onSubmit={handleSubmit((body) => onSubmit({ body, setDisabled, router}))}
    >
      <HeadFormBuy products={products} prepend={prepend} />
      <BodyFormBuy
        errors={errors}
        fields={fields}
        register={register}
        remove={remove}
      />
      <button
        type="submit"
        className="btn-primary mt-3 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
        disabled={disabled}
      >
        Agregar
      </button>
    </form>
  );
}
