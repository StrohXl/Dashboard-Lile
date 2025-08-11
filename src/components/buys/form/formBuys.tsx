"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { use } from "react";
import { FormBuyType } from "./types";
import { onSubmit } from "./utils";
import BodyFormBuy from "./components/bodyFormBuy";
import { DataBuyType } from "@/app/api/buys/type";
import HeadFormBuy from "./components/headFormBuy";
import { HookFormBuy } from "./hooks";

export default function FormBuy({
  data,
  pyDollar,
}: {
  data: Promise<DataBuyType>;
  pyDollar: Promise<number | undefined>;
}) {
  const { disabled, setDisabled, router } = HookFormBuy();

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    getValues,
  } = useForm<FormBuyType>();

  const { fields, prepend, remove } = useFieldArray({
    name: "products",
    control,
    rules: {
      required: "Agregue un producto",
    },
  });

  const products = use(data);
  const dollar = use(pyDollar);

  return (
    <form
      className="flex flex-col  gap-4 w-full max-w-[1113px] mt-12 !px-5 container-table"
      onSubmit={handleSubmit((body) => onSubmit({ body, setDisabled, router }))}
    >
      <HeadFormBuy pyDollar={dollar} products={products} prepend={prepend} />
      <BodyFormBuy
        pyDollar={dollar}
        getValues={getValues}
        errors={errors}
        fields={fields}
        setValue={setValue}
        register={register}
        remove={remove}
      />
      <button
        type="submit"
        className="btn-primary !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
        disabled={disabled}
      >
        Agregar
      </button>
    </form>
  );
}
