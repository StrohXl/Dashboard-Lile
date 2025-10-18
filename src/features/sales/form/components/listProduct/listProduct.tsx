import { useFieldArray, UseFormReturn } from "react-hook-form";

import { FormSale } from "../../models";
import ListProductBodyFormSale from "./components/listProductBodyFormSale";
import ListProductHeadFormSale from "./components/listProductHeadFormSale";

export default function ListProduct({
  useFormSale,
}: {
  useFormSale: UseFormReturn<FormSale>;
}) {
  const { control, getValues } = useFormSale;

  const useFieldProducts = useFieldArray({
    name: "list_products",
    control,
    rules: {
      required: "Agregue un producto",
    },
  });

  return (
    <div className="flex flex-col gap-4 w-full mt-6 pb-6">
      <ListProductHeadFormSale
        getValues={getValues}
        prepend={useFieldProducts.prepend}
      />
      <ListProductBodyFormSale
        useFieldProducts={useFieldProducts}
        useFormSale={useFormSale}
      />
    </div>
  );
}
