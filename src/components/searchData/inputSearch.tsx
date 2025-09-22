"use client";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { HTMLInputTypeAttribute, useState } from "react";
import { onSubmitSearch } from "./service/on-submi-search.service";
import { resetInputSearch } from "./utilities/reset-input-search.utility";
import { InputSearchType } from "./models/inputSearch.model";
import { FormSearch } from "./models/formSearch.model";

export default function InputSearch({
  placeholderInput,
  inputSearchType,
  type = "text",
}: {
  type?: HTMLInputTypeAttribute;
  placeholderInput: string;
  inputSearchType: InputSearchType;
}) {
  const [inputName, setInputName] = useState<string>("");
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const { register, reset } = useForm<FormSearch>();
  const search = searchParams.get("search");

  return (
    <form
      className={`grid grid-cols-[20px_150px_20px] gap-3 group items-center border-1  border-gray-400 px-4 rounded-[50rem] `}
    >
      <div className="">
        <IoSearchOutline size={20} />
      </div>
      <input
        {...register("search")}
        type={type}
        className="outline-none py-2 "
        defaultValue={search || ""}
        placeholder={placeholderInput}
        onChange={({ target }) =>
          onSubmitSearch({
            search: target.value.toLocaleLowerCase(),
            pathname,
            replace,
            inputSearchType,
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
              inputSearchType,
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
