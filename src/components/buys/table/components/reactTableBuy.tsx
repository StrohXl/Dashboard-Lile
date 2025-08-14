"use client";
import { Table } from "@table-library/react-table-library/table";
import { TypeData } from "@/types/data";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";
import { ThemeMaterialBuy } from "../theme";
import TableHeaderBuy from "./TableHeaderBuy";
import TableBodyBuy from "./TableBodyBuy";
import { Buy } from "@/app/api/buys/models/buy.model";

export default function ReactTableBuys({
  data,
  pyDollar,
}: {
  data: TypeData;
  pyDollar: number | undefined;
}) {
  const { select } = useDataContext();

  const nodes = { nodes: data ? data.data : [] };

  const theme = ThemeMaterialBuy();

  return (
    <Table
      layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
      data={nodes}
      select={select}
      theme={theme}
    >
      {(tableList: Buy[]) => (
        <>
          <TableHeaderBuy />
          <TableBodyBuy data={data} pyDollar={pyDollar} tableList={tableList} />
        </>
      )}
    </Table>
  );
}
