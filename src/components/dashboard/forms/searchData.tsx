"use client";
import { useForm } from "react-hook-form";
import { IoSearchOutline } from "react-icons/io5";
import { useDataContext } from "@/components/dashboard/hooks/useContextData";
import getData from "@/fetchs/data/getData";

type TypeProductSearch = {
  name: string;
};

export default function SearchData({
  apiUrl,
  placeholderInput,
}: {
  apiUrl: string;
  placeholderInput: string;
}) {
  const { setData } = useDataContext();
  
  const { register, handleSubmit } = useForm<TypeProductSearch>();
  let time: ReturnType<typeof setTimeout>;

  const onSubmit = async (body: TypeProductSearch) => {
    clearTimeout(time);
    time = setTimeout(async () => {
      const data = await getData(apiUrl, body);
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
        placeholder={placeholderInput}
        {...register("name")}
        onChange={({ target }) =>
          onSubmit({ name: target.value.toLocaleLowerCase() })
        }
      />
    </form>
  );
}
