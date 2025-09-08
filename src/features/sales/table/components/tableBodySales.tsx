import { Body, Row, Cell } from "@table-library/react-table-library/table";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { CellSelect } from "@table-library/react-table-library/select";
import { Data } from "@/models";
import { Sale } from "@/app/api/sales/models";

export default function TableBodySales({
  tableList,
  pyDollar,
  data,
}: {
  tableList: Sale[];
  pyDollar: number | undefined;
  data: Data;
}) {

  return (
    <Body>
      {tableList.map((item: Sale) => (
        <Row key={item.id} item={item}>
          <CellSelect item={item} />
          <Cell>{new Date(item.created_at).toLocaleDateString("es-Es")}</Cell>
          <Cell>{`${item.client.name} ${item.client.last_name}`}</Cell>
          <Cell>
            <div
              className={`rounded-[4px] font-roboto font-semibold px-4 w-fit text-white p-1 ${
                item.status == "pending" ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {item.status == "completed" ? "completado" : "pendiente"}
            </div>
          </Cell>
          <Cell>
            <div className="w-full grid grid-cols-[1fr_1fr]">
              <div className="text-end pe-4">{item.total_price}$</div>
              <div className="text-start ps-4 border-l-1 border-gray-400">
                {pyDollar && (item.total_price * pyDollar).toFixed(2)}
                Bs
              </div>
            </div>
          </Cell>
          <Cell>{Number(item.debt).toFixed(2)}$</Cell>
          <Cell pinRight>
            <ContainerActions
              includeActions={{ delete: true, edit: true }}
              data={data}
              apiUrl="/sales"
              id={item.id}
            />
          </Cell>
        </Row>
      ))}
    </Body>
  );
}
