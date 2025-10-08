"use client";

import "@/components/dashboard/tables/css/table.css";
import { use } from "react";
import { MdCurrencyExchange } from "react-icons/md";

import { ChangeManager } from "@/models/api/change_manager/changeManager.model";
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

import PaymentsTheme from "@/features/payments/table/theme";

import TableBodyChangeManager from "./components/tableBodyChangeManager";

export default function TableChangeManager({
  data,
}: {
  data: Promise<ResponseData<ResponseGet<ChangeManager>>>;
}) {
  const changes = use(data);

  const { setSelects } = useDataContext();

  const nodes = { nodes: changes.data };

  const select = useRowSelect(
    { nodes: changes.data ? changes.data.data : [] },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const theme = PaymentsTheme();
  const tableHeader = ["Fecha de creacion", "Monto", "Metodo", "Operacion"];

  if (changes.data && changes.data.data.length != 0) {
    return (
      <>
        <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
          <Table
            layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
            data={nodes}
            select={select}
            theme={theme}
          >
            {(tableList: ChangeManager[]) => (
              <>
                <TableHeader
                  actions={true}
                  options={tableHeader}
                  select={true}
                />
                <TableBodyChangeManager tableList={tableList} />
              </>
            )}
          </Table>
        </div>
        <TableFooter apiUrl="/change_manager" data={changes} />
      </>
    );
  } else {
    return (
      <NotHave
        message="No se encontro ningun cambio"
        icon={MdCurrencyExchange}
      />
    );
  }
}
