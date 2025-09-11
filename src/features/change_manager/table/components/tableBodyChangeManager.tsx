import { ChangeManager } from "@/app/api/change_manager/models/changeManager.model";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { Body, Cell, Row } from "@table-library/react-table-library/table";
import { CellSelect } from "@table-library/react-table-library/select";


export default function TableBodyChangeManager({
  tableList,
}: {
  tableList: ChangeManager[];
}) {
  return (
    <Body>
      {tableList.map((item: ChangeManager) => (
        <Row key={item.id} item={item}>
          <CellSelect item={item} />
          <Cell>{new Date(item.created_at).toLocaleDateString("es-ES")}</Cell>
          <Cell>
            {item.change_amount}
            {item.change_method == "divisa" ? "$" : "Bs"}
          </Cell>
          <Cell>{item.change_method}</Cell>
          <Cell>{item.operation}</Cell>
          <Cell>
            <ContainerActions
              apiUrl="/payments"
              data={tableList}
              id={item.id}
              includeActions={{ delete: true }}
            />
          </Cell>
        </Row>
      ))}
    </Body>
  );
}
