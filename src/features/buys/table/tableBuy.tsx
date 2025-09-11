"use client";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { Buy } from "@/app/api/buys/models/buy.model";
import "@/components/dashboard/tables/css/table.css";
import { ResponseData } from "@/models";
import { Table } from "@table-library/react-table-library/table";
import { use } from "react";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import { useDataContext } from "@/hooks/useContextData";
import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { onSelectChange } from "@/components/dashboard/tables/utils";
import { ThemeMaterialBuy } from "./theme";
import NotHave from "@/components/dashboard/tables/components/notHave";
import TableHeader from "@/components/dashboard/tables/components/tableHaeader";
import TableBodyBuy from "@/features/buys/table/components/tableBodyBuy";

export default function TableBuy({
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

  const tableHeader = [
    "Fecha de Compra",
    "Productos",
    <div key={3} className="text-center">
      Precio
    </div>,
  ];

  if (buys.data.length !== 0) {
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
                  data={buys.data}
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
