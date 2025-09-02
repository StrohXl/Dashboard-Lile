import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import ListPaymentsHeaderForm from "./components/listPaymentsHeaderForm";
import { FormSale } from "../../models";
import ListPaymentsBodyFormSale from "./components/listPaymentsBodyForm";

export default function ListPayments({
  register,
  errors,
  watch,
  getValues,
  control,
}: {
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  watch: UseFormWatch<FormSale>;
  control: Control<FormSale>;
  getValues: UseFormGetValues<FormSale>;
}) {
  const { fields, prepend, remove } = useFieldArray({
    name: "payments",
    control,
  });

  return (
    <div className="flex flex-col gap-4 w-full mt-6 pb-6 border-b-1 border-gray-400 ">
      <ListPaymentsHeaderForm prepend={prepend} />
      <ListPaymentsBodyFormSale
        errors={errors}
        fields={fields}
        register={register}
        watch={watch}
        remove={remove}
        getValues={getValues}
      />
    </div>
  );
}
