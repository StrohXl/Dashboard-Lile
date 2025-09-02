import { Body, Row, Cell } from "@table-library/react-table-library/table";
import ContainerActions from "@/components/dashboard/tables/components/containerActions";
import { CellSelect } from "@table-library/react-table-library/select";
import { useDataContext } from "@/hooks/useContextData";
import { Data } from "@/models";
import { Sale } from "@/app/api/sales/models";

export default function TableBodySales({
  tableList,
  pyDollar,
  data,
}: {
  tableList: Sale[];
  pyDollar: number | undefined;
  data: Data;
}) {
  const { ids } = useDataContext();

  return (
    <Body>
      {tableList.map((item: Sale) => (
        <Row key={item.id} item={item}>
          <CellSelect item={item} />

          <Cell>{new Date(item.created_at).toLocaleDateString("es-Es")}</Cell>
          <Cell>{`${item.client.name} ${item.client.last_name}`}</Cell>
          <Cell>
            <div
              className={`rounded-[4px] font-roboto font-semibold px-4 w-fit text-white p-1 ${
                item.status == "pending" ? "bg-red-500" : "bg-green-600"
              }`}
            >
              {item.status == "completed" ? "completado" : "pendiente"}
            </div>
          </Cell>
          <Cell>{item.debt}</Cell>
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
                <li key={product.id} className={`${index > 0 && "hidden"}`}>
                  <div className={`grid grid-cols-[130px_100px_100px] gap-2 `}>
                    <div>
                      <p className="truncate">{product.name}</p>
                    </div>
                    <div>{product.stock}</div>
                    <div>{Number(product.price).toFixed(2)}$</div>
                  </div>
                </li>
              ))}
            </ul>
          </Cell>
          <Cell>
            {item.payments.length == 0 ?  (
              <span className="text-red-500 font-semibold" >
                No tiene pagos registrados
              </span>
            ) : (
              <ul>
                <li>
                  <div
                    className={`grid grid-cols-[80px_100px_100px_100px] gap-2 pb-1`}
                  >
                    <div className={`font-semibold`}>Fecha</div>
                    <div className={`font-semibold`}>Metodo</div>
                    <div className={`font-semibold`}>Operacion</div>
                    <div className={`font-semibold`}>Monto</div>
                  </div>
                </li>
                {item.payments.map((payment, index) => (
                  <li
                    key={payment.id}
                    className={`${
                      index > 0 && !ids.includes(item.id) && "hidden"
                    }`}
                  >
                    <div
                      className={`grid grid-cols-[80px_100px_100px_100px] gap-2`}
                    >
                      <div>
                        <p>
                          {new Date(payment.created_at).toLocaleDateString(
                            "es-Es"
                          )}
                        </p>
                      </div>
                      <div>
                        <p>{payment.payment_method}</p>
                      </div>
                      <div>
                        <p>{payment.operation}</p>
                      </div>
                      <div>
                        <p>{payment.payment_amount}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Cell>
          <Cell>{item.total_price}$</Cell>
          <Cell>
            {pyDollar && (item.total_price * pyDollar).toFixed(2)}
            Bs
          </Cell>
          <Cell pinRight>
            <ContainerActions
              includeActions={{ delete: true, edit: true }}
              data={data}
              apiUrl="/sales"
              id={item.id}
            />
          </Cell>
        </Row>
      ))}
    </Body>
  );
}
