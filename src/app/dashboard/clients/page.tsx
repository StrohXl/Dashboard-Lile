import TableClients from "@/features/clients/table/tableClients";
import getData from "@/fetch/data/getData";
import { Suspense } from "react";

export default function Clients() {
  const clients = getData({ url: "/clients" });

  return (
    <Suspense fallback={"cargando..."}>
      <TableClients data={clients} />
    </Suspense>
  );
}
