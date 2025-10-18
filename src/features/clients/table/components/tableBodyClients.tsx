import { Client } from "@/models/api/client/client.model";

import { CellSelect } from "@table-library/react-table-library/select";
import { Body, Cell } from "@table-library/react-table-library/table";

import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { useDataContext } from "@/hooks/useContextData";
import RowTable from "@/components/dashboard/tables/components/RowTable";

export default function TableBodyClients({
  tableList,
}: {
  tableList: Client[];
}) {
  const { selects } = useDataContext();

  return (
    <Body>
      {tableList.map((item: Client) => (
        <RowTable key={item.id} id={item.id} item={item} selects={selects}>
          <CellSelect item={item} />
          <Cell>{item.name}</Cell>
          <Cell>{item.last_name}</Cell>
          <Cell>{item.ci}</Cell>
          <Cell className="border-l-1 border-[#e0e0e0]" >
            <ContainerActions
              apiUrl="/clients"
              data={tableList}
              id={item.id}
              includeActions={{ delete: true, edit: true }}
            />
          </Cell>
        </RowTable>
      ))}
    </Body>
  );
}
