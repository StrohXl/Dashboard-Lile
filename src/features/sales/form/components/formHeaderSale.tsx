import { useContextSale } from "../hooks/saleHookContext";

export default function FormHeaderSale() {
  const { totalPrice, dollar, totalPayments, totalChanges } = useContextSale();
  const mount = Number(
    (
      totalPrice * dollar -
      totalPayments * dollar +
      totalChanges * dollar
    ).toFixed(2)
  );
  return (
    <div className="pb-4 border-b-1 border-gray-400">
      <div className="flex  gap-6 justify-between items-center">
        <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
          Total de la compra
        </h4>
        <div className="flex items-center">
          <h4 className="mb-2 font-open_sans text-gray-800 me-12 font-semibold text-4xl">
            {totalPrice.toFixed(2)}$
          </h4>
          <h4 className="mb-2 ps-12 border-l-1 border-gray-600 font-open_sans text-gray-800 font-semibold text-4xl">
            {(totalPrice * dollar).toFixed(2)}Bs
          </h4>
        </div>
      </div>
      <div className="flex  gap-6 justify-between items-center">
        <h4 className="font-open_sans text-gray-600 font-semibold text-xl">
          Monto faltante
        </h4>
        <div className="flex items-center">
          <h4
            className={`font-open_sans text-green-600 me-12 font-semibold text-xl ${
              mount != 0 && "!text-red-500"
            }`}
          >
            {(totalPrice - totalPayments + totalChanges).toFixed(2)}$
          </h4>
          <h4
            className={`ps-12 border-l-1 border-gray-600 text-green-600 font-open_sans font-semibold text-xl ${
              mount != 0 && "!text-red-500"
            }`}
          >
            {(
              totalPrice * dollar -
              totalPayments * dollar +
              totalChanges * dollar
            ).toFixed(2)}
            Bs
          </h4>
        </div>
      </div>
    </div>
  );
}
