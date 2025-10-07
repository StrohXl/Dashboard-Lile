import { calculateTotalPrice } from "@/utils";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";


import { FormSale } from "../../../models";

export function removeProduct({
  fields,
  id,
  remove,
  setTotalPrice,
}: {
  id: number;
  fields: FieldArrayWithId<FormSale, "list_products">[];
  remove: UseFieldArrayRemove;
  setTotalPrice: (value: number) => void;
}) {
  const fieldsUpdate = fields.filter((item) => item.id !== id);
  const totalPrice = calculateTotalPrice(fieldsUpdate);
  remove(id);
  setTotalPrice(totalPrice);
}
