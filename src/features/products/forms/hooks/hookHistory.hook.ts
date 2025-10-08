import { HistoryPrice } from "@/models/api/history_price/historyPrice.model";
import { useState } from "react";

export function HookHistory() {

  const [historyPrice, setHistoryPrice] = useState<HistoryPrice[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [loadingHistory, setLoadingHistory] = useState<boolean>(true);

  return {
    historyPrice,
    setHistoryPrice,
    showHistory,
    setShowHistory,
    loadingHistory,
    setLoadingHistory,
  };
}
