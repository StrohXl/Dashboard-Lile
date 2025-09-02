import { Body, Row, Cell } from "@table-library/react-table-library/table";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { CellSelect } from "@table-library/react-table-library/select";
import { useDataContext } from "@/hooks/useContextData";
import { handleExpand } from "@/components/dashboard/tables/utils";
import { Product } from "@/app/api/products/models";
import { Data } from "@/models";

function TableBodyProducts({
  tableList,
  pyDollar,
  data,
}: {
  pyDollar: number | undefined;
  tableList: Product[];
  data: Data;
}) {
  const { ids, setIds, selects } = useDataContext();

  return (
    <Body>
      {tableList.map((item: Product) => (
        <Row
          className={`${
            !selects.includes(item.id) &&
            item.stock <= 10 &&
            "!bg-red-500 text-white stock-red"
          }`}
          key={item.id}
          item={item}
          onClick={() => handleExpand({ ids, setIds, idItem: item.id })}
        >
          <CellSelect item={item} />
          <Cell>{item.name}</Cell>
          <Cell>{item.price}</Cell>
          <Cell>{pyDollar && (item.price * pyDollar).toFixed(2)} Bs</Cell>
          <Cell>
            {`${
              item.unit == "kg"
                ? item.stock >= 1000
                  ? `${item.stock / 1000} kg`
                  : `${item.stock} gr`
                : item.stock
            }`}
          </Cell>
          <Cell>{new Date(item.createdAT).toLocaleDateString("es-ES")}</Cell>
          <Cell>{new Date(item.updatedAT).toLocaleDateString("es-ES")}</Cell>
          <Cell pinRight>
            <ContainerActions
              item={item}
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
