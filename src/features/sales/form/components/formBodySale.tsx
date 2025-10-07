import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormReset,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";

import { useContextSale } from "../hooks/saleHookContext";
import { FormSale } from "../models";
import SectionClient from "./client/sectionClient";
import ListPaymentsAndChanges from "./listPaymentsAndChanges/listPaymentsAndChanges";
import ListProduct from "./listProduct/listProduct";

export default function FormBodySale({
  register,
  errors,
  watch,
  setValue,
  control,
  getValues,
  reset,
}: {
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  setValue: UseFormSetValue<FormSale>;
  reset: UseFormReset<FormSale>;
  watch: UseFormWatch<FormSale>;
  control: Control<FormSale>;
  getValues: UseFormGetValues<FormSale>;
}) {
  const { formSteps } = useContextSale();

  const {
    fields: paymentFields,
    prepend: paymentPrepend,
    remove: paymentRemove,
  } = useFieldArray({
    name: "payments",
    control,
  });

  const {
    fields: changeFields,
    prepend: changePrepend,
    remove: changeRemove,
  } = useFieldArray({
    name: "change_manager",
    control,
  });

  return (
    <>
      {formSteps == 0 && (
        <SectionClient
          watch={watch}
          errors={errors}
          register={register}
          setValue={setValue}
          reset={reset}
        />
      )}
      {formSteps == 1 && (
        <ListProduct
          errors={errors}
          watch={watch}
          getValues={getValues}
          register={register}
          control={control}
        />
      )}

      {formSteps == 2 && (
        <div className="grid xl:grid-cols-[1fr_1px_1fr] gap-6 mt-6 pb-6">
          <ListPaymentsAndChanges
            errors={errors}
            fields={paymentFields}
            getValues={getValues}
            option="payments"
            prepend={paymentPrepend}
            register={register}
            remove={paymentRemove}
            watch={watch}
            setValue={setValue}
          />
          <div className=" w-full h-[1px] xl:h-full xl:w-[1px] bg-gray-400"></div>
          <ListPaymentsAndChanges
            errors={errors}
            fields={changeFields}
            getValues={getValues}
            option="changes"
            prepend={changePrepend}
            register={register}
            remove={changeRemove}
            watch={watch}
            setValue={setValue}
          />
        </div>
      )}
    </>
  );
}
