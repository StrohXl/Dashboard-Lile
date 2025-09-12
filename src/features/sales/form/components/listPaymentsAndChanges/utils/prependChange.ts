import { UseFieldArrayPrepend } from "react-hook-form";
import { FormSale } from "../../../models";

export function prependChange({
  prepend,
}: {
  prepend: UseFieldArrayPrepend<FormSale, "change_manager">;
}) {
  prepend({
    id: 0,
    change_amount: 0,
    change_method: "efectivo Bs",
  });
}
