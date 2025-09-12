"use client";

import "@/components/dashboard/tables/css/table.css";
import { Payment } from "@/app/api/payments/models/payment.model";
import NotHave from "@/components/dashboard/tables/components/notHave";
import { useDataContext } from "@/hooks/useContextData";
import { ResponseData } from "@/models";
import { use } from "react";
import { MdOutlinePayments } from "react-icons/md";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { Table } from "@table-library/react-table-library/table";
import TableHeader from "@/components/dashboard/tables/components/tableHeader";
import TableBodyPayments from "./components/tableBodyPayments";
import PaymentsTheme from "./theme";

export default function TablePayments({
  data,
}: {
  data: Promise<ResponseData<Payment>>;
}) {
  
  const payments = use(data);

  const { setSelects } = useDataContext();

  const nodes = { nodes: payments.data };

  const select = useRowSelect(
    { nodes: payments.data },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const theme = PaymentsTheme();
  const tableHeader = ["Fecha de creacion", "Monto", "Metodo", "Operacion"];

  if (payments.data.length != 0) {
    return (
      <>
        <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
          <Table
            layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
            data={nodes}
            select={select}
            theme={theme}
          >
            {(tableList: Payment[]) => (
              <>
                <TableHeader
                  actions={true}
                  options={tableHeader}
                  select={true}
                />
                <TableBodyPayments tableList={tableList} />
              </>
            )}
          </Table>
        </div>
        <TableFooter apiUrl="/payments" data={payments} />
      </>
    );
  } else {
    return (
      <NotHave message="No se encontro ningun pago" icon={MdOutlinePayments} />
    );
  }
}
