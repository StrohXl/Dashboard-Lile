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

  const bgRed = "!bg-red-500 dark:!bg-red-500 text-white stock-red font-medium";

  return (
    <Body>
      {tableList.map((item: Product) => (
        <Row
          className={`
             dark:!text-white
            ${
              selects.includes(item.id)
                ? "dark:!bg-gray-700"
                : item.unit == "unit"
                  ? item.stock < 5
                    ? bgRed
                    : "dark:!bg-gray-800 "
                  : item.unit == "kg" && item.stock <= 10000
                    ? bgRed
                    : "dark:!bg-gray-800 "
            }
            `}
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
            {`${item.unit == "kg" ? `${item.stock} Kg` : item.stock}`}
          </Cell>
          <Cell>{new Date(item.createdAT).toLocaleDateString("es-ES")}</Cell>
          <Cell>{new Date(item.updatedAT).toLocaleDateString("es-ES")}</Cell>
          <Cell
            pinRight
            className="right-0 border-l-1 border-[#f0f0f0] dark:!border-gray-400 "
          >
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
