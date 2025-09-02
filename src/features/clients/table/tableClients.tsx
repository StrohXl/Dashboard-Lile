"use client";

import "@/components/dashboard/tables/css/table.css";
import { Client } from "@/app/api/clients/models/client.model";
import { useDataContext } from "@/hooks/useContextData";
import { ResponseData } from "@/models";
import { Table } from "@table-library/react-table-library/table";
import { use } from "react";
import ClientTheme from "./theme";
import TableHeaderClients from "./components/tableHeaderClients";
import TableBodyClients from "./components/tableBodyClients";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import NotHaveClients from "./components/notHaveClients";

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

  if (clients.data.length != 0) {
    return (
      <div>
        <Table data={nodes} theme={theme} select={select}>
          {(tableList: Client[]) => (
            <>
              <TableHeaderClients />
              <TableBodyClients tableList={tableList} />
            </>
          )}
        </Table>
        <TableFooter apiUrl="/clients" data={clients} />
      </div>
    );
  } else {
    return <NotHaveClients />;
  }
}
