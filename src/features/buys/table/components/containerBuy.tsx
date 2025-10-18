import { Buy } from "@/models/api/buy";

export default function ContainerBuy({
  buy,
  dollar,
}: {
  buy: Buy;
  dollar: number;
}) {
  return (
    <div className="text-gray-800 dark:text-white">
      <div className="grid font-roboto grid-cols-[1fr_1fr] gap-3 mb-4 pb-4 border-b-1 border-gray-400">
        <h5 className="">Total:</h5>
        <h5 className="text-end">
          {buy.total_price}${" "}
          <span className="ms-3 ps-3 border-l-1 border-gray-400">
            {(buy.total_price * dollar).toFixed(2)}Bs
          </span>
        </h5>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-[1fr_100px_150px] gap-4">
          <span>Productos:</span>
          <span>Cantidad:</span>
          <span>Precio de compra:</span>
        </div>
        {buy.list_products.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_100px_150px] gap-4">
            <div
              className={`
                 border-gray-400 dark:border-white border-1 flex items-center px-3 py-2 gap-2   w-full rounded-sm `}
            >
              <input
                className="w-full bg-transparent autofill:bg-transparent outline-none text-gray-800 dark:text-white"
                autoComplete="off"
                disabled
                value={item.name}
              />
            </div>
            <div
              className={`
                 border-gray-400 dark:border-white border-1 flex items-center px-3 py-2 gap-2   w-full rounded-sm `}
            >
              <input
              
                className="w-full bg-transparent autofill:bg-transparent outline-none text-gray-800 dark:text-white"
                autoComplete="off"
                disabled
                value={item.stock}
              />
              {item.unit == "kg" && "Kg"}
            </div>
            <div
              className={`
                 border-1 border-transparent flex items-center py-1    w-full rounded-sm text-gray-800 dark:text-white `}
            >
              <span className="pe-3">{item.price}$</span>
              <span className=" ps-3 border-gray-400 border-l-1">
                {(item.price * dollar).toFixed(2)}Bs
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
