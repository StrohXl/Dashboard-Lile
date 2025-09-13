import { useContextSale } from "../../../hooks/saleHookContext";

export default function FooterChanges() {
  const { totalPayments, dollar, totalPrice, totalChanges } = useContextSale();
  const totalDebt = totalPayments - totalPrice;

  return (
    <div className="mt-auto">
      <div className="grid mt-4 grid-cols-[130px_1fr] items-center gap-4">
        <h6 className="font-roboto text-gray-600 font-semibold">
          Cambios totales:
        </h6>
        <div
          className={`font-roboto text-gray-700 font-semibold grid grid-cols-2 items-center ${
            totalPayments > 0 &&
            totalChanges != 0 &&
            totalChanges > totalDebt &&
            "!text-red-500"
          }`}
        >
          <span className="ms-auto pe-4 block">{totalChanges.toFixed(2)}$</span>
          <span className="border-l-1 border-gray-400 ps-4 block">
            {(totalChanges * dollar).toFixed(2)}Bs
          </span>
        </div>
      </div>
      <div className="grid mt-2 grid-cols-[130px_1fr] items-center gap-4">
        <h6 className="font-roboto text-gray-600 font-semibold">
          Cambio Faltante:
        </h6>
        <div
          className={`font-roboto text-green-600 ${
            totalPayments > totalPrice &&
            totalChanges < totalDebt &&
            "!text-blue-500"
          } font-semibold grid grid-cols-2 items-center`}
        >
          <span className="ms-auto pe-4 block">
            {totalPayments <= totalPrice || totalChanges > totalDebt
              ? `0.00`
              : (totalDebt - totalChanges).toFixed(2)}
            $
          </span>
          <span className="border-l-1 border-gray-400 ps-4 block">
            {totalPayments <= totalPrice || totalChanges > totalDebt
              ? `0.00`
              : (
                  totalPayments * dollar -
                  totalPrice * dollar -
                  totalChanges * dollar
                ).toFixed(2)}
            Bs
          </span>
        </div>
      </div>
    </div>
  );
}
