"use client";
import { use } from "react";
import { useForm, useFieldArray } from "react-hook-form";

import BodyFormBuy from "./components/bodyFormBuy";
import HeadFormBuy from "./components/headFormBuy/headFormBuy";
import ModalCalculatePrice from "./components/modalCalculatePrice";
import { HookFormBuy } from "./hooks";
import type { FormBuy } from "./models";
import { onSubmit } from "./services/onSubmitBuy";

export default function FormBuy({
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
}) {
  const IVA = 16;
  const { disabled, setDisabled, router } = HookFormBuy();

  const {
    handleSubmit,
    formState: { errors },
    register,
    control,
    setValue,
    getValues,
    watch,
  } = useForm<FormBuy>({
    defaultValues: {
      selling_price: 0,
    },
  });

  const { fields, prepend, remove } = useFieldArray({
    name: "products",
    control,
    rules: {
      required: "Agregue un producto",
    },
  });

  const dollar = use(pyDollar) ?? 1;

  return (
    <>
      <form
        className="flex flex-col h-fit  gap-4 w-full max-w-[800px] !px-5 container-table"
        onSubmit={handleSubmit((body) =>
          onSubmit({ body, setDisabled, router, iva: IVA })
        )}
      >
        <HeadFormBuy getValues={getValues} prepend={prepend} />
        <BodyFormBuy
          IVA={IVA}
          pyDollar={dollar}
          getValues={getValues}
          errors={errors}
          fields={fields}
          setValue={setValue}
          register={register}
          remove={remove}
          watch={watch}
        />
        <button
          type="submit"
          className="btn-primary !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
          disabled={disabled}
        >
          Crear Comprar
        </button>
      </form>
      <ModalCalculatePrice
        errors={errors}
        getValues={getValues}
        pyDollar={dollar}
        register={register}
        setValue={setValue}
        watch={watch}
      />
    </>
  );
}
