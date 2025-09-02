import { Client } from "@/app/api/clients/models/client.model";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { Body, Cell, Row } from "@table-library/react-table-library/table";
import { CellSelect } from "@table-library/react-table-library/select";

export default function TableBodyClients({
  tableList,
}: {
  tableList: Client[];
}) {
  return (
    <Body>
      {tableList.map((item: Client) => (
        <Row key={item.id} item={item}>
          <CellSelect item={item} />
          <Cell>{item.name}</Cell>
          <Cell>{item.last_name}</Cell>
          <Cell>{item.ci}</Cell>
          <Cell>
            <ContainerActions
              apiUrl="/clients"
              data={tableList}
              id={item.id}
              includeActions={{ delete: true, edit: true }}
            />
          </Cell>
        </Row>
      ))}
    </Body>
  );
}
