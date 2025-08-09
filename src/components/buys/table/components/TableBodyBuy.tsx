import { Body, Row, Cell } from "@table-library/react-table-library/table";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { CellSelect } from "@table-library/react-table-library/select";
import { TableBuysType } from "../types";
import { FaChevronDown } from "react-icons/fa6";
import { handleExpand } from "../utils";
import { TypeData } from "@/types/data";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";

function TableBodyBuy({
  tableList,
  pyDollar,
  data,
}: {
  tableList: TableBuysType[];
  pyDollar: number | undefined;
  data: TypeData;
}) {
  const { ids, setIds, selects } = useDataContext();

  return (
    <Body>
      {tableList.map((item: TableBuysType) => (
        <Row key={item.id} item={item}>
          <CellSelect item={item} />
          <Cell>
            {item.products.map(
              (producto, index) =>
                index > 0 &&
                index < 2 && (
                  <button
                    key={producto.id}
                    onClick={() =>
                      handleExpand({ idItem: item.id, ids, setIds })
                    }
                    className="cursor-pointer p-1 transition-colors duration-300 hover:text-primary"
                  >
                    <FaChevronDown
                      className={`transition-transform duration-300 ${
                        ids.includes(item.id) && "rotate-x-180"
                      }`}
                    />
                  </button>
                )
            )}
          </Cell>
          <Cell>{new Date(item.createdAT).toLocaleDateString("es-Es")}</Cell>
          <Cell>
            <ul>
              <li>
                <div className={`grid grid-cols-[70%_1fr] pb-1`}>
                  <div
                    className={`${
                      selects.includes(item.id) && "text-black "
                    } font-semibold`}
                  >
                    Producto
                  </div>
                  <div
                    className={`${
                      selects.includes(item.id) && "text-black "
                    } font-semibold`}
                  >
                    Cantidad
                  </div>
                </div>
              </li>
              {item.products.map((product, index) => (
                <li
                  key={product.id}
                  className={`${
                    index > 0 && !ids.includes(item.id) && "hidden"
                  }`}
                >
                  <div
                    className={`grid grid-cols-[70%_1fr]  ${
                      item.products.length > 0 &&
                      ids.includes(item.id) &&
                      index !== item.products.length - 1 &&
                      "pb-2"
                    }`}
                  >
                    <div>{product.name}</div>
                    <div>{product.stock}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Cell>
          <Cell>
            {item.products.reduce(
              (total, item) => total + item.price * item.stock,
              0
            )}
            $
          </Cell>
          <Cell>
            {pyDollar &&
              item.products.reduce(
                (total, item) => total + item.price * item.stock,
                0
              ) * pyDollar}
            Bs
          </Cell>
          <Cell pinRight>
            <ContainerActions data={data} apiUrl="/buys" id={item.id} />
          </Cell>
        </Row>
      ))}
    </Body>
  );
}

export default TableBodyBuy;
