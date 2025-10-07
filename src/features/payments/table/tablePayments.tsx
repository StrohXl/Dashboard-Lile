"use client";

import "@/components/dashboard/tables/css/table.css";
import { Payment } from "@/app/api/payments/models/payment.model";
import { use } from "react";
import { MdOutlinePayments } from "react-icons/md";

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

import TableBodyPayments from "./components/tableBodyPayments";
import PaymentsTheme from "./theme";
import { ResponseData } from "@/models/response/responseData.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export default function TablePayments({
  data,
}: {
  data: Promise<ResponseData<ResponseGet<Payment>>>;
}) {
  const payments = use(data);

  const { setSelects } = useDataContext();

  const nodes = { nodes: payments.data };

  const select = useRowSelect(
    { nodes: payments.data ? payments.data.data : [] },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const theme = PaymentsTheme();
  const tableHeader = ["Fecha de creacion", "Monto", "Metodo", "Operacion"];

  if (payments.data && payments.data.data.length != 0) {
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
