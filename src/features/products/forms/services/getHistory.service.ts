import { HistoryPrice } from "@/models/api/history_price/historyPrice.model";
import { ResponseData } from "@/models/response/responseData.model";
import getDataById from "@/services/get/byId/getDataById";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export async function getHistory({
  id,
  setHistoryPrice,
  setLoadingHistory,
}: {
  setLoadingHistory: (value: boolean) => void;
  setHistoryPrice: (value: HistoryPrice[]) => void;
  id: number;
}) {
  setLoadingHistory(true);
  try {
    const data = await getDataById<HistoryPrice[]>({
      apiUrl: "/history_price",
      id,
    });
    setHistoryPrice(data.data ? data.data : []);
  } catch (error) {
    if (error instanceof AxiosError) {
      const errorData: ResponseData<HistoryPrice> = error.response?.data;
      toast.error(errorData.message);
    }
    setHistoryPrice([]);
  }
  setLoadingHistory(false);
}
