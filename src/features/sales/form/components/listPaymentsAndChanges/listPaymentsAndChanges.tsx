import { UseFormReturn } from "react-hook-form";

import { FormSale } from "../../models";
import ListChanges from "./features/listChanges";
import ListPayments from "./features/listPayments";

export default function ListPaymentsAndChanges({
  useFormSale,
}: {
  useFormSale: UseFormReturn<FormSale>;
}) {
  return (
    <div className="grid xl:grid-cols-[1fr_1px_1fr] gap-6 mt-6 pb-6">
      <ListPayments option="payments" useFormSale={useFormSale} />
      <div className=" w-full h-[1px] xl:h-full xl:w-[1px] bg-gray-400"></div>
      <ListChanges option="changes" useFormSale={useFormSale} />
    </div>
  );
}
