import { Data } from "@/models";
import { Buy } from "@/models/api/buy/buy.model";

import { useDataContext } from "@/hooks/useContextData";

import { CellSelect } from "@table-library/react-table-library/select";
import { Body, Row, Cell } from "@table-library/react-table-library/table";

import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import getDataById from "@/services/get/byId/getDataById";
import { toast } from "react-toastify";

export default function TableBodyBuy({
  tableList,
  pyDollar,
  data,
}: {
  tableList: Buy[];
  pyDollar: number | undefined;
  data: Data;
}) {
  const { ids, setBuy, setLoadingDrawer, setOpenDrawer } = useDataContext();

  const getBuyById = async (id: number) => {
    setOpenDrawer(true);
    setLoadingDrawer(true);
    try {
      const buy = await getDataById<Buy>({ apiUrl: "/buys", id });
      setBuy(buy.data);
    } catch {
      setBuy(undefined);
      toast.error("No se encontro ninguna compra");
    }
    setLoadingDrawer(false);
  };

  return (
    <Body>
      {tableList.map((item: Buy) => (
        <Row key={item.id} item={item}>
          <CellSelect item={item} />
          <Cell>{new Date(item.createdAT).toLocaleDateString("es-Es")}</Cell>
          <Cell>
            <ul>
              <li>
                <div
                  className={`grid grid-cols-[130px_100px_100px] gap-2 pb-1`}
                >
                  <div className={`font-semibold`}>Producto</div>
                  <div className={`font-semibold`}>Cantidad</div>
                  <div className={`font-semibold`}>Total</div>
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
                    <div>{`${
                      product.unit == "kg"
                        ? `${product.stock} kg`
                        : product.stock
                    }`}</div>
                    <div>{Number(product.price).toFixed(2)}$</div>
                  </div>
                </li>
              ))}
            </ul>
          </Cell>
          <Cell>
            <div className="w-full grid grid-cols-[1fr_1fr]">
              <div className="text-end pe-4">
                {Number(item.total_price).toFixed(2)}$
              </div>
              <div className="text-start ps-4 border-l-1 border-gray-400">
                {pyDollar && (item.total_price * pyDollar).toFixed(2)}
                Bs
              </div>
            </div>
          </Cell>
          <Cell pinRight>
            <ContainerActions
              includeActions={{ delete: true, see: true }}
              data={data}
              apiUrl="/buys"
              id={item.id}
              setOpenDrawer={getBuyById}
            />
          </Cell>
        </Row>
      ))}
    </Body>
  );
}
