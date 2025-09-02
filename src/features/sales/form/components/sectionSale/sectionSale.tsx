import { useContextSale } from "../../hooks/saleHookContext";

export default function SectionSale() {
  const { totalPrice, dollar } = useContextSale();
  return (
    <div className="flex flex-col gap-4 w-full !px-5 container-table">
      <div>
        <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
          Venta
        </h4>
      </div>
      <div className="mt-auto border-t-1 gap-6 border-gray-400 !pt-4 flex justify-between">
        <span className="font-roboto font-semibold text-lg">Precio total:</span>
        <div className="font-roboto text-lg">
          {parseFloat(totalPrice.toFixed(2))}$ |{" "}
          {parseFloat((totalPrice * dollar).toFixed(2))}Bs
        </div>
      </div>
      <div className="flex justify-end">
        <button className="btn-primary">Crear Venta</button>
      </div>
    </div>
  );
}
