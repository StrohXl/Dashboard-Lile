"use client";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
export default function SearchData({
  placeholderInput,
}: {
  placeholderInput: string;
}) {
  const [inputName, setInputName] = useState<string>("");
  const { register, reset } = useForm<{ name: string }>();

  let time: ReturnType<typeof setTimeout>;
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const onSubmit = async (search: string) => {
    setInputName(search);
    const params = new URLSearchParams(searchParams);
    clearTimeout(time);
    time = setTimeout(async () => {
      if (search) {
        params.set("name", search);
      } else {
        params.delete("name");
      }
      replace(`${pathname}?${params.toString()}`);
    }, 300);
  };

  const resetInput = () => {
    setInputName("");
    reset({ name: "" });
    onSubmit("");
  };

  return (
    <form
      className={`grid grid-cols-[20px_150px_20px] gap-3 group items-center border-1  border-gray-400 px-4 rounded-[50rem] `}
    >
      <div className="">
        <IoSearchOutline size={20} />
      </div>
      <input
        {...register("name")}
        type="text"
        className="outline-none py-2 "
        defaultValue={name || ""}
        placeholder={placeholderInput}
        onChange={({ target }) => onSubmit(target.value.toLocaleLowerCase())}
      />
      {inputName !== "" && (
        <div
          onClick={resetInput}
          className="cursor-pointer transition-colors focus:group- duration-300 hover:text-primary "
        >
          <IoCloseOutline size={20} />
        </div>
      )}
    </form>
  );
}
