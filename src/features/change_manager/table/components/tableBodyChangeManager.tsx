import { ChangeManager } from "@/models/api/change_manager/changeManager.model";

import { CellSelect } from "@table-library/react-table-library/select";
import { Body, Cell } from "@table-library/react-table-library/table";

import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import RowTable from "@/components/dashboard/tables/components/RowTable";
import { useDataContext } from "@/hooks/useContextData";

export default function TableBodyChangeManager({
  tableList,
}: {
  tableList: ChangeManager[];
}) {
  const { selects } = useDataContext();

  return (
    <Body>
      {tableList.map((item: ChangeManager) => (
        <RowTable key={item.id} id={item.id} item={item} selects={selects}>
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
              apiUrl="/change_manager"
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
