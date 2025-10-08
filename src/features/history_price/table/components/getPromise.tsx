"use client";
import { HistoryPrice } from "@/models/history_price/historyPrice.model";
import { use } from "react";

import TableBodyHistoryPrice from "./tableBodyHistoryPrice";
import { ResponseData } from "@/models/response/responseData.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export default function GetPromise({
  data,
  dollarPy,
}: {
  data: Promise<ResponseData<ResponseGet<HistoryPrice>>>;
  dollarPy: Promise<number | undefined>;
}) {
  const historyPrice = use(data);
  const dollar = use(dollarPy) ?? 0;
  return (
    <TableBodyHistoryPrice data={historyPrice.data? historyPrice.data.data: []} dollarPy={dollar} />
  );
}
