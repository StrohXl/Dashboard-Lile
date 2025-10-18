import { calculateTotalPayments } from "@/app/api/sales/utilities";
import { calculateTotalChanges } from "@/app/api/sales/utilities/calculateTotalChanges.utility";
import getDataById from "@/services/get/byId/getDataById";
import { ParamValue } from "next/dist/server/request/params";
import { UseFormReset } from "react-hook-form";
import { toast } from "react-toastify";

import { Sale } from "@/models/api/sale";
import { ResponseData } from "@/models/response/responseData.model";

import { FormSale } from "../models";

export async function getSale({
  id,
  reset,
  setLoadingSale,
  setTotalPayments,
  setTotalPrice,
  dollar,
  setTotalChanges,
  setIdSale,
}: {
  dollar: number;
  id: ParamValue;
  setTotalPrice: (value: number) => void;
  setTotalPayments: (value: number) => void;
  setTotalChanges: (value: number) => void;
  setLoadingSale: (value: boolean) => void;
  reset: UseFormReset<FormSale>;
  setIdSale: (value: number) => void;
}) {
  try {
    const data: ResponseData<Sale> = await getDataById({
      apiUrl: "/sales",
      id: Number(id),
    });
    const sale = data.data;
    if (sale) {
      setTotalPrice(Number(sale?.total_price));
      const totalPayments = calculateTotalPayments({
        dollar,
        payments: sale?.payments,
      });
      const totalChanges = calculateTotalChanges({
        changes: sale ? sale.change_manager : [],
        dollar,
      });
      setTotalPayments(totalPayments);
      setTotalChanges(totalChanges);
      setIdSale(sale.id);
      reset({
        client: {
          id: sale?.client.id,
          ci: `${sale?.client.ci}`,
          last_name: sale?.client.last_name,
          name: sale?.client.name,
        },
        list_products: sale?.list_products,
        payments: sale?.payments,
        change_manager: sale?.change_manager,
      });
      setLoadingSale(false);
    }
  } catch (error) {
    console.error(error);
    toast.error("Hubo  un error");
  }
}
