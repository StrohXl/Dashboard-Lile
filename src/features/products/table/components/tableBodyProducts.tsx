import { Data } from "@/models";
import { Product } from "@/models/api/product";

import { useDataContext } from "@/hooks/useContextData";

import { CellSelect } from "@table-library/react-table-library/select";
import { Body, Row, Cell } from "@table-library/react-table-library/table";






import ContainerActions from "@/components/dashboard/tables/components/containerActions";

function TableBodyProducts({
  tableList,
  pyDollar,
  data,
}: {
  pyDollar: number | undefined;
  tableList: Product[];
  data: Data;
}) {
  const { selects } = useDataContext();

  return (
    <Body>
      {tableList.map((item: Product) => (
        <Row
          className={`${
            !selects.includes(item.id) &&
            item.stock <= 10 &&
            "!bg-red-500 text-white stock-red font-medium"
          }`}
          key={item.id}
          item={item}
        >
          <CellSelect item={item} />
          <Cell>{item.name}</Cell>
          <Cell>
            <div className="w-full grid grid-cols-[1fr_1fr]">
              <div className="text-end pe-4">{item.price}$</div>
              <div className="text-start ps-4 border-l-1 border-gray-400">
                {pyDollar && (item.price * pyDollar).toFixed(2)}
                Bs
              </div>
            </div>
          </Cell>
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
