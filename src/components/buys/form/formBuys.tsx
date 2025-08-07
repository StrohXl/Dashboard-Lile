"use client";
import { useForm } from "react-hook-form";
import TypeProduct from "@/app/api/products/type/typeProducts";
import { use } from "react";
import BuyType from "@/app/api/buys/type";
import SelectFormBuy from "./components/selectFormBuy";

type DataType = {
  data: TypeProduct[];
  pages: number;
};

export default function FormBuy({ data }: { data: Promise<DataType> }) {
  const {
    handleSubmit,
    formState: { errors },
  } = useForm<BuyType>();

  const products = use(data);

  const onSubmit = (body: BuyType) => {
    console.log(body);
  };

  return (
    <form
      className="flex flex-col gap-4 max-w-[550px] mt-12 !px-5 container-table"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex items-center justify-between gap-3">
        <h4 className="mb-2 font-open_sans text-gray-800 font-semibold text-2xl">
          Compra
        </h4>
        <div className="flex items-center gap-3">
          {products.data.length > 0 && (
            <SelectFormBuy options={products.data} />
          )}
          <button className="">Crear Producto</button>
        </div>
      </div>

      <button
        type="submit"
        disabled={true}
        className="btn-primary mt-3 !px-8 disabled:opacity-50 disabled:!cursor-not-allowed"
      >
        Agregar
      </button>
    </form>
  );
}
