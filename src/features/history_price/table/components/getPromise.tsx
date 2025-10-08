"use client";
import { use } from "react";

import { HistoryPrice } from "@/models/api/history_price/historyPrice.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseData } from "@/models/response/responseData.model";

import TableBodyHistoryPrice from "./tableBodyHistoryPrice";


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
