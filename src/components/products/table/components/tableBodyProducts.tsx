import { Body, Row, Cell } from "@table-library/react-table-library/table";
import TypeProducts from "../types/typeProducts";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { CellSelect } from "@table-library/react-table-library/select";
import { TypeData } from "@/types/data";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";
import { handleExpand } from "@/components/dashboard/tables/utils";

function TableBodyProducts({
  tableList,
  pyDollar,
  data,
}: {
  pyDollar: number | undefined;
  tableList: TypeProducts[];
  data: TypeData;
}) {
  const { ids, setIds } = useDataContext();

  return (
    <Body>
      {tableList.map((item: TypeProducts) => (
        <Row
          key={item.id}
          item={item}
          onClick={() => handleExpand({ ids, setIds, idItem: item.id })}
        >
          <CellSelect item={item} />
          <Cell>{item.name}</Cell>
          <Cell>{item.price}</Cell>
          <Cell>{pyDollar && (item.price * pyDollar).toFixed(2)} Bs</Cell>
          <Cell>{item.stock}</Cell>
          <Cell>{new Date(item.createdAT).toLocaleDateString("es-ES")}</Cell>
          <Cell>{new Date(item.updatedAT).toLocaleDateString("es-ES")}</Cell>
          <Cell pinRight>
            <ContainerActions
              includeActions={{ delete: true, edit: true }}
              data={data}
              apiUrl="/products"
              id={item.id}
            />
          </Cell>
        </Row>
      ))}
    </Body>
  );
}

export default TableBodyProducts;
