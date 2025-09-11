"use client";

import "@/components/dashboard/tables/css/table.css";
import { HiArchiveBoxXMark } from "react-icons/hi2";
import { ResponseData } from "@/models";
import { use } from "react";
import { Product } from "@/app/api/products/models";
import { Table } from "@table-library/react-table-library/table";
import TableBodyProducts from "./components/tableBodyProducts";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { useDataContext } from "@/hooks/useContextData";
import ThemeTableProducts from "./theme";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import TableHeader from "@/components/dashboard/tables/components/tableHaeader";
import NotHave from "@/components/dashboard/tables/components/notHave";

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

  const tableHeader = [
    "Producto",
    <div className="text-center" key={1}>Precio</div>,
    "Existentes",
    "Fecha de Creacion",
    "Fecha de Actualizacion",
  ];

  if (products.data.length !== 0) {
    return (
      <>
        <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
          <Table
            layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
            data={nodes}
            select={select}
            theme={theme}
          >
            {(tableList: Product[]) => (
              <>
                <TableHeader
                  actions={true}
                  options={tableHeader}
                  select={true}
                />
                <TableBodyProducts
                  data={products.data}
                  pyDollar={dollar}
                  tableList={tableList}
                />
              </>
            )}
          </Table>
        </div>
        <TableFooter apiUrl="/products" data={products} />
      </>
    );
  } else {
    return <NotHave icon={HiArchiveBoxXMark} message="No tienes productos actualmente" />;
  }
}
