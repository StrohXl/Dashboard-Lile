"use client";
import { ResponseData } from "@/models";
import TableBodyHistoryPrice from "./tableBodyHistoryPrice";
import { use } from "react";
import { HistoryPrice } from "@/app/api/history_price/models/historyPrice.model";

export default function GetPromise({
  data,
  dollarPy,
}: {
  data: Promise<ResponseData<HistoryPrice>>;
  dollarPy: Promise<number | undefined>;
}) {
  const historyPrice = use(data);
  const dollar = use(dollarPy) ?? 0;
  return <TableBodyHistoryPrice data={historyPrice.data} dollarPy={dollar} />;
}
