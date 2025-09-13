import { useContextSale } from "../../../hooks/saleHookContext";

export default function FooterPayments() {
    
  const { totalPayments, dollar, totalPrice } = useContextSale();

  return (
    <div className="mt-auto">
      <div className="grid mt-4 grid-cols-[130px_1fr] items-center gap-4">
        <h6 className="font-roboto text-gray-600 font-semibold">
          Pagos totales:
        </h6>
        <div className="font-roboto text-gray-700 font-semibold grid grid-cols-2 items-center">
          <span className="ms-auto pe-4 block">
            {totalPayments.toFixed(2)}$
          </span>
          <span className="border-l-1 border-gray-400 ps-4 block">
            {(totalPayments * dollar).toFixed(2)}Bs
          </span>
        </div>
      </div>
      <div className="grid mt-2 grid-cols-[130px_1fr] items-center gap-4">
        <h6 className="font-roboto text-gray-600 font-semibold">
          Monto Faltante:
        </h6>
        <div
          className={`font-roboto text-green-600 ${
            totalPayments < totalPrice && "!text-red-500"
          } font-semibold grid grid-cols-2 items-center`}
        >
          <span className="ms-auto pe-4 block">
            {totalPayments > totalPrice
              ? `0.00`
              : (totalPrice - totalPayments).toFixed(2)}
            $
          </span>
          <span className="border-l-1 border-gray-400 ps-4 block">
            {totalPayments > totalPrice
              ? `0.00`
              : (totalPrice * dollar - totalPayments * dollar).toFixed(2)}
            Bs
          </span>
        </div>
      </div>
    </div>
  );
}
