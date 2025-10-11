"use client";

import { RefObject } from "react";

import { CreateClient } from "@/models/api/client";
import { CreateListProduct } from "@/models/api/list_products";

export default function Invoice({
  client,
  products,
  dollar,
  totalPrice,
  includeIva = false,
  aproapprovedByTheSENIAT = false,
  containerInvoice,
  idDocument,
  created_at,
}: {
  client: CreateClient;
  products: CreateListProduct;
  dollar: number;
  totalPrice: number;
  includeIva?: boolean;
  aproapprovedByTheSENIAT?: boolean;
  containerInvoice: RefObject<null>;
  idDocument: number;
  created_at?: string;
}) {
  const date = created_at ? new Date(created_at) : new Date();
  const createdAT = date.toLocaleDateString("es-Es");
  const horas = date.getHours(); // 0-23
  const minutos =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes(); // 0-59
  const segundos =
    date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds(); // 0-59;

  const subTotalBs = (totalPrice * dollar).toFixed(2);
  const totalBs = (totalPrice * dollar).toFixed(2);

  const nameDocument = aproapprovedByTheSENIAT ? "FACTURA" : "DOCUMENTO";

  return (
    <div ref={containerInvoice} className="font-roboto text-sm p-6 text-black">
      <div className="mb-6">
        <div className="uppercase">
          <h4>Cliente: {`${client.name} ${client.last_name}`}</h4>
        </div>
        <div className="mb-2 uppercase">
          <h4>RIF: V{client.ci}</h4>
        </div>
      </div>
      <div className="pb-2 border-b-1 mb-2 border-gray-300">
        <h3 className="text-center text-lg font-bold mb-4 ">{nameDocument}</h3>
        <div className="flex justify-between">
          <h4>{nameDocument}:</h4>
          <h4>{idDocument}</h4>
        </div>
        <div className="flex justify-between">
          <h4>FECHA: {createdAT}</h4>
          <h4 className="flex gap-3">
            <span>HORA:</span>
            <span>
              {horas}:{minutos}:{segundos}
            </span>
          </h4>
        </div>
      </div>
      <div className="pb-2 border-b-1 mb-2 border-gray-300">
        {products.map((item, index) => {
          const priceBs = Number((item.price * dollar).toFixed(2));
          const priceKg = item.price;
          const priceKgBs = priceKg * dollar;
          return (
            <div key={index} className="grid grid-cols-[70%_1fr] gap-4">
              <div className="flex flex-col">
                <h4 className="uppercase">
                  {item.name} {includeIva && `(${item.iva ? "G" : "E"})`}
                </h4>
                {item.unit == "unit" && item.stock > 1 && (
                  <h4 className="-translate-y-2">
                    {item.stock} x {priceBs}
                  </h4>
                )}
                {item.unit == "kg" && (
                  <h4 className="-translate-y-2">
                    {item.stock} x {priceKgBs.toFixed(2)}
                  </h4>
                )}
              </div>
              <div>
                <h4 className="text-end">
                  Bs
                  {item.unit == "unit"
                    ? (priceBs * item.stock).toFixed(2)
                    : (item.stock * priceKgBs).toFixed(2)}
                </h4>
              </div>
            </div>
          );
        })}
      </div>

      {includeIva && (
        <div className="pb-2 border-b-1 mb-2 border-gray-300">
          <div className="grid grid-cols-[1fr_1fr] gap-4">
            <h4>SUBTIL</h4>
            <h4 className="text-end">Bs {subTotalBs}</h4>
          </div>
        </div>
      )}

      <div>
        <div className="grid grid-cols-[1fr_1fr] gap-4">
          <h4>TOTAL</h4>
          <h4 className="text-end">Bs {totalBs}</h4>
        </div>
      </div>
      <div className="pb-6 mt-10 border-gray-300">
        <h4 className="text-center">GRACIAS POR SU COMPRA</h4>
      </div>

      <div className="mb-2">
        <h4 className="text-center text-lg">
          COMPROBANTE NO VÁLIDO COMO FACTURA FISCAL
        </h4>
      </div>
    </div>
  );
}
