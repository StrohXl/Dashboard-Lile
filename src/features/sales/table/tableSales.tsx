"use client";
import { FaCashRegister } from "react-icons/fa6";

import "@/components/dashboard/tables/css/table.css";
import { Sale } from "@/app/api/sales/models";

import { ResponseData } from "@/models";

import { useDataContext } from "@/hooks/useContextData";

import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { Table } from "@table-library/react-table-library/table";

import { use } from "react";


import NotHave from "@/components/dashboard/tables/components/notHave";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import TableHeader from "@/components/dashboard/tables/components/tableHeader";
import { onSelectChange } from "@/components/dashboard/tables/utils";

import TableBodySales from "./components/tableBodySales";
import { ThemeMaterialSales } from "./theme";



export default function TableSales({
  data,
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
  data: Promise<ResponseData<Sale>>;
}) {
  const dollar = use(pyDollar) ?? 1;
  const sales = use(data);

  const { setSelects } = useDataContext();

  const select = useRowSelect(
    { nodes: sales.data },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const nodes = { nodes: sales.data };

  const tableHeader = [
    "Fecha de Venta",
    "Cliente",
    "Estado",
    <div key={4} className="text-center">
      Precio
    </div>,
    "Deuda",
  ];

  const theme = ThemeMaterialSales();
  if (sales.data.length !== 0) {
    return (
      <>
        <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
          <Table
            layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
            data={nodes}
            select={select}
            theme={theme}
          >
            {(tableList: Sale[]) => (
              <>
                <TableHeader options={tableHeader} />
                <TableBodySales
                  data={sales.data}
                  pyDollar={dollar}
                  tableList={tableList}
                />
              </>
            )}
          </Table>
        </div>
        <TableFooter apiUrl="/sales" data={sales} />
      </>
    );
  } else {
    return (
      <NotHave message="No tienes ventas actualmente" icon={FaCashRegister} />
    );
  }
}
