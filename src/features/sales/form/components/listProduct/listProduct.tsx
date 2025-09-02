import ListProductBodyFormSale from "./components/listProductBodyFormSale";
import ListProductHeadFormSale from "./components/listProductHeadFormSale";
import {
  Control,
  useFieldArray,
  UseFormGetValues,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";
import { FormSale } from "../../models";

export default function ListProduct({
  register,
  getValues,
  watch,
  control,
}: {
  control: Control<FormSale>;
  register: UseFormRegister<FormSale>;
  getValues: UseFormGetValues<FormSale>;
  watch: UseFormWatch<FormSale>;
}) {
  const { fields, prepend, remove } = useFieldArray({
    name: "list_products",
    control,
    rules: {
      required: "Agregue un producto",
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full mt-6 pb-6 border-b-1 border-gray-400 ">
      <ListProductHeadFormSale fields={fields} prepend={prepend} />
      <ListProductBodyFormSale
        watch={watch}
        fields={fields}
        register={register}
        remove={remove}
        getValues={getValues}
      />
    </div>
  );
}
