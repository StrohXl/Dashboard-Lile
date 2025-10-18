import { useContextSale } from "../../../hooks/saleHookContext";

export default function FooterChanges() {
  const { totalPayments, dollar, totalPrice, totalChanges } = useContextSale();
  const totalDebt = Number(
    (Number(totalPayments.toFixed(2)) - totalPrice).toFixed(2)
  );
  const total = totalDebt - Number(totalChanges.toFixed(2));

  return (
    <div className="mt-auto  text-gray-700 dark:text-white">
      <div className="grid mt-4 grid-cols-[130px_1fr] items-center gap-4">
        <h6 className="font-roboto font-semibold">Cambios totales:</h6>
        <div
          className={`font-roboto  font-semibold grid grid-cols-2 items-center ${
            total > 0 && "!text-red-500"
          }`}
        >
          <span className="ms-auto pe-4 block">{totalChanges.toFixed(2)}$</span>
          <span className="border-l-1 border-gray-400 ps-4 block">
            {(totalChanges * dollar).toFixed(2)}Bs
          </span>
        </div>
      </div>
      <div className="grid mt-2 grid-cols-[130px_1fr] items-center gap-4">
        <h6 className="font-roboto font-semibold">Cambio Faltante:</h6>
        <div
          className={`font-roboto text-green-600 ${
            total < 0 && "!text-blue-500"
          } font-semibold grid grid-cols-2 items-center`}
        >
          <span className="ms-auto pe-4 block">
            {(total < 0 ? 0: totalDebt - totalChanges).toFixed(2)}$
          </span>
          <span className="border-l-1 border-gray-400 ps-4 block">
            {(total < 0
              ? 0
              : (Math.abs(totalPayments - totalPrice) - totalChanges) * dollar
            ).toFixed(2)}
            Bs
          </span>
        </div>
      </div>
    </div>
  );
}
