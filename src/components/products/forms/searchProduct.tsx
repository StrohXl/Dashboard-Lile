'use client'
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import getProducts from "@/fetchs/products/getProducts";
import { useProductsContext } from "../tables/tableProducts/hooks/hooksTable";

type TypeProductSearch = {
  name: string;
};

export default function SearchProduct() {
  const { setData } = useProductsContext();
  const { register, handleSubmit } = useForm<TypeProductSearch>();
  let time: ReturnType<typeof setTimeout>;

  const onSubmit = async (body: TypeProductSearch) => {
    clearTimeout(time);
    time = setTimeout(async () => {
      const data = await getProducts(body);
      setData(data);
    }, 300);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex gap-3 group items-center border-1  border-gray-400 px-4 rounded-[50rem] `}
    >
      <button
        type="submit"
        className="cursor-pointer transition-colors focus:group- duration-300 hover:text-primary "
      >
        <IoSearchOutline size={20} />
      </button>
      <input
        type="text"
        className="outline-none py-2 "
        placeholder="Buscar producto..."
        {...register("name")}
        onChange={({ target }) =>
          onSubmit({ name: target.value.toLocaleLowerCase() })
        }
      />
    </form>
  );
}
