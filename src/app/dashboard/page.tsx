import { ChartComponent } from "@/components/dashboard/charts/buys/lineChart";
import { Suspense } from "react";
import getData from "@/fetch/data/getData";

export default function Dashboard() {
  const buys = getData({ url: "/buys", params: { all: true } });
  const initialData = [
    { time: "2018-12-22", value: 32 },
    { time: "2018-12-23", value: 31 },
    { time: "2018-12-24", value: 27 },
    { time: "2018-12-25", value: 27 },
    { time: "2018-12-26", value: 25 },
    { time: "2018-12-27", value: 28 },
    { time: "2018-12-28", value: 25 },
    { time: "2018-12-29", value: 23 },
    { time: "2018-12-30", value: 22 },
    { time: "2018-12-31", value: 22 },
  ];
  return (
    <section
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      id="dashboard"
    >
      <Suspense fallback={"cargando..."}>
        <ChartComponent resData={buys} data={initialData} />
      </Suspense>
    </section>
  );
}
