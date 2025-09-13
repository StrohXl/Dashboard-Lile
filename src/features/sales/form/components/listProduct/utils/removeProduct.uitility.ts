import { Sale } from "@/app/api/sales/models";
import { calculateTotalPrice } from "@/utils";
import { FieldArrayWithId, UseFieldArrayRemove } from "react-hook-form";

export function removeProduct({
  fields,
  id,
  remove,
  setTotalPrice,
}: {
  id: number;
  fields: FieldArrayWithId<Sale, "list_products">[];
  remove: UseFieldArrayRemove;
  setTotalPrice: (value: number) => void;
}) {
  const fieldsUpdate = fields.filter((item) => item.id !== id);
  const totalPrice = calculateTotalPrice(fieldsUpdate);
  remove(id);
  setTotalPrice(totalPrice);
}
