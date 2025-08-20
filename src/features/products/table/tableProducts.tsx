"use client";

import "@/components/dashboard/tables/css/table.css";
import NotHaveProducts from "./components/notHaveProducts";
import { ResponseData } from "@/models";
import { use } from "react";
import { Product } from "@/app/api/products/models";
import { Table } from "@table-library/react-table-library/table";
import TableHeaderProducts from "./components/tableHeaderProducts";
import TableBodyProducts from "./components/tableBodyProducts";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { useDataContext } from "@/hooks/useContextData";
import ThemeTableProducts from "./theme";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "@/components/dashboard/tables/utils";

export default function TableProducts({
  data,
  pyDollar,
}: {
  data: Promise<ResponseData<Product>>;
  pyDollar: Promise<number | undefined>;
}) {
  const products = use(data);
  const dollar = use(pyDollar) ?? 1;

  const { setSelects } = useDataContext();

  const theme = ThemeTableProducts();
  const nodes = { nodes: products.data };

  const select = useRowSelect(

    { nodes: products.data },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
    
  );

  if (products.data.length !== 0) {
    return (
      <>
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
                data={products.data}
                pyDollar={dollar}
                tableList={tableList}
              />
            </>
          )}
        </Table>
        <TableFooter apiUrl="/products" data={products} />
      </>
    );
  } else {
    return <NotHaveProducts />;
  }
}
