import {
  Control,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { FormSale } from "../../models";
import ListChangesHeaderForm from "./components/components/listChangesHeaderForm";
import ListChangesBodyFormSale from "./components/components/listChangesBodyForm";

export function ChangeManager({
  register,
  errors,
  watch,
  getValues,
  control,
}: {
  control: Control<FormSale>;
  register: UseFormRegister<FormSale>;
  errors: FieldErrors<FormSale>;
  getValues: UseFormGetValues<FormSale>;
  watch: UseFormWatch<FormSale>;
}) {
  const { fields, prepend, remove } = useFieldArray({
    name: "change_manager",
    control,
  });

  return (
    <div className="mt-4 pb-4 border-b-1 border-gray-400" >
      <ListChangesHeaderForm prepend={prepend} />
      <ListChangesBodyFormSale
        errors={errors}
        fields={fields}
        getValues={getValues}
        register={register}
        remove={remove}
        watch={watch}
      />
    </div>
  );
}
