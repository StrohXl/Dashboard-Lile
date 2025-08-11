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
  const { ids, setIds } = useDataContext();

  return (
    <Body>
      {tableList.map((item: TableBuysType) => (
        <Row key={item.id} item={item}>
          <CellSelect item={item} />
          <Cell>
            {item.list_products.map(
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
                <div
                  className={`grid grid-cols-[130px_100px_100px] gap-2 pb-1`}
                >
                  <div className={`font-semibold`}>Producto</div>
                  <div className={`font-semibold`}>Cantidad</div>
                  <div className={`font-semibold`}>Precio</div>
                </div>
              </li>
              {item.list_products.map((product, index) => (
                <li
                  key={product.id}
                  className={`${
                    index > 0 && !ids.includes(item.id) && "hidden"
                  }`}
                >
                  <div
                    className={`grid grid-cols-[130px_100px_100px] gap-2  ${
                      item.products.length > 0 &&
                      ids.includes(item.id) &&
                      index !== item.products.length - 1 &&
                      "pb-2"
                    }`}
                  >
                    <div>
                      <p className="truncate">{product.name}</p>
                    </div>
                    <div>{product.stock}</div>
                    <div>{product.price}$</div>
                  </div>
                </li>
              ))}
            </ul>
          </Cell>
          <Cell>{item.total_price}$</Cell>
          <Cell>
            {pyDollar && (item.total_price * pyDollar).toFixed(2)}
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
