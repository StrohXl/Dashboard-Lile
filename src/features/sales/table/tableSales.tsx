"use client";
import "@/components/dashboard/tables/css/table.css";
import { ResponseData } from "@/models";
import { Table } from "@table-library/react-table-library/table";
import { use } from "react";
import TableHeaderSales from "./components/tableHeaderSales";
import TableBodySales from "./components/tableBodySales";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { useDataContext } from "@/hooks/useContextData";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import { ThemeMaterialSales } from "./theme";
import { Sale } from "@/app/api/sales/models";
import NotHaveSales from "./components/notHaveSales";

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

  const theme = ThemeMaterialSales();
  if (sales.data.length !== 0) {
    return (
      <>
        <Table
          layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
          data={nodes}
          select={select}
          theme={theme}
        >
          {(tableList: Sale[]) => (
            <>
              <TableHeaderSales />
              <TableBodySales
                data={sales.data}
                pyDollar={dollar}
                tableList={tableList}
              />
            </>
          )}
        </Table>
        <TableFooter apiUrl="/sales" data={sales} />
      </>
    );
  } else {
    return <NotHaveSales />;
  }
}
