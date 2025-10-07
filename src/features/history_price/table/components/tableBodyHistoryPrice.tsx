"use client";
import "@/components/dashboard/tables/css/table.css";
import { HistoryPrice } from "@/app/api/history_price/models/historyPrice.model";

import {
  Body,
  Row,
  Cell,
  Table,
} from "@table-library/react-table-library/table";

import TableHeader from "@/components/dashboard/tables/components/tableHeader";

import ThemeTableHistory from "../theme";

export default function TableBodyHistoryPrice({
  data,
  dollarPy,
}: {
  dollarPy: number | undefined;
  data: HistoryPrice[] | undefined;
}) {
  const nodes = { nodes: data && data };

  const tableHeader = [
    "Fecha",
    <div key={1} className="text-center">
      Precio
    </div>,
  ];

  const theme = ThemeTableHistory();

  return (
    <>
      <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
        <Table
          layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
          data={nodes}
          theme={theme}
        >
          {(tableList: HistoryPrice[]) => (
            <>
              <TableHeader
                select={false}
                options={tableHeader}
                actions={false}
              />
              <Body>
                {tableList.map((item: HistoryPrice) => (
                  <Row item={item} key={item.id}>
                    <Cell>
                      {new Date(item.created_at).toLocaleDateString("es-ES")}
                    </Cell>
                    <Cell>
                      <div className="w-full grid grid-cols-[1fr_1fr]">
                        <div className="text-end pe-4">{item.price}$</div>
                        <div className="text-start ps-4 border-l-1 border-gray-400">
                          {dollarPy && (item.price * dollarPy).toFixed(2)}
                          Bs
                        </div>
                      </div>
                    </Cell>
                  </Row>
                ))}
              </Body>
            </>
          )}
        </Table>
      </div>
      <div className="mt-4 min-h-[43px]"></div>
    </>
  );
}
