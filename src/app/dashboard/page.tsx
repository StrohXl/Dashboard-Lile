import { Suspense } from "react";
import CardSuspense from "../../components/dashboard/cards/CardSuspense";
import getCountData from "@/services/get/count/getCountData";
import CardSuspenseLoading from "../../components/dashboard/cards/CardSuspenseLoading";

export default async function Dashboard() {
  // Get Data
  const totalSales = getCountData({ apiUrl: "/sales/total" });
  const moneyReceivedTotal = getCountData({
    apiUrl: "/payments/money_received",
  });
  const moneyOutflowTotal = getCountData({
    apiUrl: "/change_manager/money_outflow",
  });
  
  return (
    <section id="dashboard">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <Suspense fallback={<CardSuspenseLoading />}>
          <CardSuspense title="Número de Ventas" dataPromise={totalSales} />
        </Suspense>
        <Suspense fallback={<CardSuspenseLoading />}>
          <CardSuspense
            iconStart={"$"}
            title="Dinero Ingresado"
            dataPromise={moneyReceivedTotal}
          />
        </Suspense>
        <Suspense fallback={<CardSuspenseLoading />}>
          <CardSuspense
            title="Dinero Egresado"
            iconStart={"$"}
            dataPromise={moneyOutflowTotal}
          />
        </Suspense>
      </div>
    </section>
  );
}
