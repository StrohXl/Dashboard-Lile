"use client";

import { HiUsers } from "react-icons/hi";
import "@/components/dashboard/tables/css/table.css";
import { Client } from "@/app/api/clients/models/client.model";
import { useDataContext } from "@/hooks/useContextData";
import { ResponseData } from "@/models";
import { Table } from "@table-library/react-table-library/table";
import { use } from "react";
import ClientTheme from "./theme";
import TableBodyClients from "./components/tableBodyClients";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import TableHeader from "@/components/dashboard/tables/components/tableHeader";
import NotHave from "@/components/dashboard/tables/components/notHave";

export default function TableClients({
  data,
}: {
  data: Promise<ResponseData<Client>>;
}) {
  const { setSelects } = useDataContext();
  const clients = use(data) ?? { data: [], pages: 1 };
  const nodes = { nodes: clients.data };
  const theme = ClientTheme();
  const select = useRowSelect(
    { nodes: clients ? clients.data : [] },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const tableHeader = ["Nombre", "Apellido", "C.I"];

  if (clients.data.length != 0) {
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
