"use client";
import { Table } from "@table-library/react-table-library/table";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";
import { TypeData } from "@/types/data";
import TableHeaderProducts from "./tableHeaderProducts";
import TableBodyProducts from "./tableBodyProducts";
import ThemeTableProducts from "../theme";
import { Product } from "@/app/api/products/models";

export default function ReactTable({
  pyDollar,
  data,
}: {
  data: TypeData;
  pyDollar: number | undefined;
}) {
  const { select } = useDataContext();
  const theme = ThemeTableProducts();
  const nodes = { nodes: data ? data.data : [] };

  return (
    <Table
      layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
      data={nodes}
      select={select}
      theme={theme}
    >
      {(tableList: Product[]) => (
        <>
          <TableHeaderProducts />
          <TableBodyProducts
            pyDollar={pyDollar}
            data={data}
            tableList={tableList}
          />
        </>
      )}
    </Table>
  );
}
