import { Payment } from "@/models/api/payment/payment.model";

import { CellSelect } from "@table-library/react-table-library/select";
import { Body, Cell } from "@table-library/react-table-library/table";

import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import RowTable from "@/components/dashboard/tables/components/RowTable";
import { useDataContext } from "@/hooks/useContextData";

export default function TableBodyPayments({
  tableList,
}: {
  tableList: Payment[];
}) {
  const { selects } = useDataContext();

  return (
    <Body>
      {tableList.map((item: Payment) => (
        <RowTable key={item.id} item={item} id={item.id} selects={selects}>
          <CellSelect item={item} />
          <Cell>{new Date(item.created_at).toLocaleDateString("es-ES")}</Cell>
          <Cell>
            {item.payment_amount}
            {item.payment_method == "divisa" ? "$" : "Bs"}
          </Cell>
          <Cell>{item.payment_method}</Cell>
          <Cell>{item.operation}</Cell>
          <Cell>
            <ContainerActions
              apiUrl="/payments"
              data={tableList}
              id={item.id}
              includeActions={{ delete: true }}
            />
          </Cell>
        </RowTable>
      ))}
    </Body>
  );
}
