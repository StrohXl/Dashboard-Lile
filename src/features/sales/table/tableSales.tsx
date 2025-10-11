"use client";
import { FaCashRegister } from "react-icons/fa6";
import "@/components/dashboard/tables/css/table.css";

import { Sale } from "@/models/api/sale";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseData } from "@/models/response/responseData.model";

import { Drawer } from "antd";

import { useDataContext } from "@/hooks/useContextData";

import {
  useRowSelect,
  SelectClickTypes,
} from "@table-library/react-table-library/select";
import { Table } from "@table-library/react-table-library/table";

import { use } from "react";

import NotHave from "@/components/dashboard/tables/components/notHave";
import TableFooter from "@/components/dashboard/tables/components/tableFooter";
import TableHeader from "@/components/dashboard/tables/components/tableHeader";
import { onSelectChange } from "@/components/dashboard/tables/utils";

import TableBodySales from "./components/tableBodySales";
import { ThemeMaterialSales } from "./theme";
import Invoice from "@/documents/invoice";
import { downloadPdf } from "@/documents/utils/downloadPdf";

export default function TableSales({
  data,
  pyDollar,
}: {
  pyDollar: Promise<number | undefined>;
  data: Promise<ResponseData<ResponseGet<Sale>>>;
}) {
  const dollar = use(pyDollar) ?? 1;
  const sales = use(data);

  const {
    setSelects,
    openDrawer,
    setOpenDrawer,
    loadingDrawer,
    sale,
    containerInvoice,
  } = useDataContext();

  const select = useRowSelect(
    { nodes: sales.data ? sales.data.data : [] },
    {
      onChange: (action, state) => onSelectChange({ setSelects, state }),
    },
    {
      clickType: SelectClickTypes.ButtonClick,
    }
  );

  const nodes = { nodes: sales.data ? sales.data.data : [] };

  const tableHeader = [
    "Fecha de Venta",
    "Cliente",
    "Estado",
    <div key={4} className="text-center">
      Precio
    </div>,
    "Deuda",
  ];

  const theme = ThemeMaterialSales();
  if (sales.data && sales.data.data.length !== 0) {
    return (
      <>
        <div className="h-[330px] 2xl:h-[420px] container-table-scroll">
          <Table
            layout={{ fixedHeader: true, horizontalScroll: true, custom: true }}
            data={nodes}
            select={select}
            theme={theme}
          >
            {(tableList: Sale[]) => (
              <>
                <TableHeader options={tableHeader} />
                <TableBodySales
                  data={sales.data ? sales.data.data : []}
                  pyDollar={dollar}
                  tableList={tableList}
                />
              </>
            )}
          </Table>
        </div>
        <TableFooter apiUrl="/sales" data={sales} />
        <Drawer
          placement="right"
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
          loading={loadingDrawer}
          styles={{
            body: { padding: loadingDrawer ? 24 : 0 },
          }}
          title={
            !loadingDrawer &&
            sale && (
              <button
                className="btn-primary ms-auto"
                onClick={() =>
                  sale &&
                  downloadPdf({
                    documentId: sale.id,
                    refElement: containerInvoice,
                  })
                }
              >
                Descargar PDF
              </button>
            )
          }
        >
          {sale ? (
            <Invoice
              client={sale.client}
              dollar={dollar}
              idDocument={sale.id}
              products={sale.list_products}
              totalPrice={sale.total_price}
              containerInvoice={containerInvoice}
              created_at={sale.created_at}
              payments={sale.payments}
            />
          ) : (
            <span>No se encontro ninguna venta</span>
          )}
        </Drawer>
      </>
    );
  } else {
    return (
      <NotHave message="No tienes ventas actualmente" icon={FaCashRegister} />
    );
  }
}
