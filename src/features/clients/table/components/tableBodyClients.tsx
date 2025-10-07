import { Client } from "@/models/client/client.model";

import { CellSelect } from "@table-library/react-table-library/select";
import { Body, Cell, Row } from "@table-library/react-table-library/table";

import ContainerActions from "@/components/dashboard/tables/components/containerActions";


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
