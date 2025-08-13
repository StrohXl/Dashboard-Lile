"use client";
import { Table } from "@table-library/react-table-library/table";
import { TableBuysType } from "../types";
import { TypeData } from "@/types/data";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";
import { ThemeMaterialBuy } from "../theme";
import TableHeaderBuy from "./TableHeaderBuy";
import TableBodyBuy from "./TableBodyBuy";

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
      {(tableList: TableBuysType[]) => (
        <>
          <TableHeaderBuy />
          <TableBodyBuy data={data} pyDollar={pyDollar} tableList={tableList} />
        </>
      )}
    </Table>
  );
}
