"use client";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { onSubmitSearch } from "./service/on-submi-search.service";
import { resetInputSearch } from "./utilities/reset-input-search.utility";

export default function SearchData({
  placeholderInput,
}: {
  placeholderInput: string;
}) {
  const [inputName, setInputName] = useState<string>("");
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const { register, reset } = useForm<{ name: string }>();
  const name = searchParams.get("name");

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
        onChange={({ target }) =>
          onSubmitSearch({
            search: target.value.toLocaleLowerCase(),
            pathname,
            replace,
            searchParams,
            setInputName,
          })
        }
      />
      {inputName !== "" && (
        <div
          onClick={() =>
            resetInputSearch({
              pathname,
              replace,
              reset,
              searchParams,
              setInputName,
            })
          }
          className="cursor-pointer transition-colors focus:group- duration-300 hover:text-primary "
        >
          <IoCloseOutline size={20} />
        </div>
      )}
    </form>
  );
}
