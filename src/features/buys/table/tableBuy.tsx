"use client";
import { Buy } from "@/app/api/buys/models/buy.model";
import "@/components/dashboard/tables/css/table.css";
import { ResponseData } from "@/models";
import { Table } from "@table-library/react-table-library/table";
import { use } from "react";
import TableHeaderBuy from "./components/TableHeaderBuy";
import TableBodyBuy from "./components/TableBodyBuy";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { useDataContext } from "@/hooks/useContextData";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import { ThemeMaterialBuy } from "./theme";
import NotHaveBuys from "./components/notHaveBuys";

export default function TableBuys({
  data,
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
  data: Promise<ResponseData<Buy>>;
}) {
  const dollar = use(pyDollar) ?? 1;
  const buys = use(data);

  const { setSelects } = useDataContext();

  const select = useRowSelect(
    { nodes: buys.data },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const nodes = { nodes: buys.data };

  const theme = ThemeMaterialBuy();
  if (buys.data.length !== 0) {
    return (
      <>
        <Table
          layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
          data={nodes}
          select={select}
          theme={theme}
        >
          {(tableList: Buy[]) => (
            <>
              <TableHeaderBuy />
              <TableBodyBuy
                tableList={tableList}
                pyDollar={dollar}
                data={buys.data}
              />
            </>
          )}
        </Table>
        <TableFooter apiUrl="/buys" data={buys} />
      </>
    );
  } else {
    return <NotHaveBuys />;
  }
}
