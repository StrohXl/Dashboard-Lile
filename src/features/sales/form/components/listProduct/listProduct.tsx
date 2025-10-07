import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

import { FormSale } from "../../models";
import ListProductBodyFormSale from "./components/listProductBodyFormSale";
import ListProductHeadFormSale from "./components/listProductHeadFormSale";

export default function ListProduct({
  register,
  getValues,
  watch,
  control,
  errors,
}: {
  control: Control<FormSale>;
  getValues: UseFormGetValues<FormSale>;
  register: UseFormRegister<FormSale>;
  watch: UseFormWatch<FormSale>;
  errors: FieldErrors<FormSale>;
}) {
  const { fields, prepend, remove } = useFieldArray({
    name: "list_products",
    control,
    rules: {
      required: "Agregue un producto",
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full mt-6 pb-6">
      <ListProductHeadFormSale getValues={getValues} prepend={prepend} />
      <ListProductBodyFormSale
        errors={errors}
        watch={watch}
        fields={fields}
        register={register}
        remove={remove}
        getValues={getValues}
      />
    </div>
  );
}
