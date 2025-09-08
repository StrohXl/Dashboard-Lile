import { Sale } from "@/app/api/sales/models";
import axios from "axios";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";
import { FormSale } from "../models";
import { calculateTotalPayments } from "@/app/api/sales/utilities";
import { ParamValue } from "next/dist/server/request/params";
import { calculateTotalChanges } from "@/app/api/sales/utilities/calculateTotalChanges.utility";

export async function getSale({
  id,
  reset,
  setLoadingSale,
  setTotalPayments,
  setTotalPrice,
  dollar,
  setTotalChanges,
}: {
  dollar: number;
  id: ParamValue;
  setTotalPrice: (value: number) => void;
  setTotalPayments: (value: number) => void;
  setTotalChanges: (value: number) => void;
  setLoadingSale: (value: boolean) => void;
  reset: UseFormReset<FormSale>;
}) {
  try {
    const { data }: { data: Sale } = await axios.get(`/api/sales/${id}`);
    setTotalPrice(Number(data.total_price));
    const totalPayments = calculateTotalPayments({
      dollar,
      payments: data.payments,
    });
    const totalChanges = calculateTotalChanges({
      changes: data.change_manager,
      dollar,
    });
    setTotalPayments(totalPayments);
    setTotalChanges(totalChanges);
    reset({
      client: {
        id: data.client.id,
        ci: `${data.client.ci}`,
        last_name: data.client.last_name,
        name: data.client.name,
      },
      list_products: data.list_products,
      payments: data.payments,
      change_manager: data.change_manager,
    });
    setLoadingSale(false);
  } catch (error) {
    console.error(error);
    toast.error("Hubo  un error");
  }
}
