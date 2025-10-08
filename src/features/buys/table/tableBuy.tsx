"use client";
import { Buy } from "@/models/api/buy/buy.model";
import { use } from "react";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";

import "@/components/dashboard/tables/css/table.css";

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

import TableBodyBuy from "@/features/buys/table/components/TableBodyBuy";

import { ThemeMaterialBuy } from "./theme";
import { ResponseData } from "@/models/response/responseData.model";
import { ResponseGet } from "@/models/response/get/responseGet.model";

export default function TableBuy({
  data,
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
  data: Promise<ResponseData<ResponseGet<Buy>>>;
}) {
  const dollar = use(pyDollar) ?? 1;
  const buys = use(data);

  const { setSelects } = useDataContext();

  const select = useRowSelect(
    { nodes: buys.data ? buys.data.data : [] },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const nodes = { nodes: buys.data };

  const theme = ThemeMaterialBuy();

  const tableHeader = [
    "Fecha de Compra",
    "Productos",
    <div key={3} className="text-center">
      Precio
    </div>,
  ];

  if (buys.data && buys.data.data.length !== 0) {
    return (
      <>
        <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
          <Table
            layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
            data={nodes}
            select={select}
            theme={theme}
          >
            {(tableList: Buy[]) => (
              <>
                <TableHeader options={tableHeader} />
                <TableBodyBuy
                  tableList={tableList}
                  pyDollar={dollar}
                  data={buys.data ? buys.data.data : []}
                />
              </>
            )}
          </Table>
        </div>
        <TableFooter apiUrl="/buys" data={buys} />
      </>
    );
  } else {
    return (
      <NotHave
        message="No tienes compras actualmente"
        icon={MdOutlineRemoveShoppingCart}
      />
    );
  }
}
