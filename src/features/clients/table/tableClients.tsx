"use client";

import "@/components/dashboard/tables/css/table.css";
import { use } from "react";
import { HiUsers } from "react-icons/hi";

import { Client } from "@/models/api/client/client.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseData } from "@/models/response/responseData.model";

import { useDataContext } from "@/hooks/useContextData";

import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { Table } from "@table-library/react-table-library/table";

import NotHave from "@/components/dashboard/tables/components/notHave";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import TableHeader from "@/components/dashboard/tables/components/tableHeader";
import { onSelectChange } from "@/components/dashboard/tables/utils";

import TableBodyClients from "./components/tableBodyClients";
import ClientTheme from "./theme";

export default function TableClients({
  data,
}: {
  data: Promise<ResponseData<ResponseGet<Client>>>;
}) {
  const { setSelects } = useDataContext();
  const clients = use(data);
  console.log(clients);
  const nodes = { nodes: clients.data ? clients.data.data : [] };
  const theme = ClientTheme();
  const select = useRowSelect(
    { nodes: clients.data ? clients.data.data : [] },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const tableHeader = ["Nombre", "Apellido", "C.I"];

  if (clients.data && clients.data.data.length != 0) {
    return (
      <>
        <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
          <Table
            layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
            data={nodes}
            theme={theme}
            select={select}
          >
            {(tableList: Client[]) => (
              <>
                <TableHeader options={tableHeader} />
                <TableBodyClients tableList={tableList} />
              </>
            )}
          </Table>
        </div>
        <TableFooter apiUrl="/clients" data={clients} />
      </>
    );
  } else {
    return <NotHave icon={HiUsers} message="No tienes clientes actualmente" />;
  }
}
