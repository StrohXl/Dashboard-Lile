"use client";

import "@/components/dashboard/tables/css/table.css";
import NotHave from "@/components/dashboard/tables/components/notHave";
import { useDataContext } from "@/hooks/useContextData";
import { ResponseData } from "@/models";
import { use } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { Table } from "@table-library/react-table-library/table";
import TableHeader from "@/components/dashboard/tables/components/tableHeader";
import { ChangeManager } from "@/app/api/change_manager/models/changeManager.model";
import TableBodyChangeManager from "./components/tableBodyChangeManager";
import PaymentsTheme from "@/features/payments/table/theme";

export default function TableChangeManager({
  data,
}: {
  data: Promise<ResponseData<ChangeManager>>;
}) {
  const changes = use(data);

  const { setSelects } = useDataContext();

  const nodes = { nodes: changes.data };

  const select = useRowSelect(
    { nodes: changes.data },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const theme = PaymentsTheme();
  const tableHeader = ["Fecha de creacion", "Monto", "Metodo", "Operacion"];

  if (changes.data.length != 0) {
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
