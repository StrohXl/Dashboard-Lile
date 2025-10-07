"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MdDelete } from "react-icons/md";


import { ApiUrl, Data } from "@/models";

import toastDelete from "@/components/Toast/data/toastDelete";

import { useDataContext } from "../../../../hooks/useContextData";

export default function DeleteSelects({
  apiUrl,
  data,
}: {
  data: Data;
  apiUrl: ApiUrl
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const { disabled, setDisabled, selects } = useDataContext();

  const deleteDataArray = async () => {
    setDisabled(true);
    await toastDelete({
      ids: selects,
      apiUrl,
      data,
      pathname,
      replace,
      searchParams,
    });
    refresh();
    setDisabled(false);
  };

  if (selects.length != 0) {
    return (
      <button
        disabled={disabled}
        onClick={() => deleteDataArray()}
        className="transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-gray-500 hover:border-primary  lg:border-1  p-1 lg:px-3 lg:py-2 rounded-lg flex items-center gap-4 font-medium cursor-pointer w-fit text-gray-500 hover:text-primary"
      >
        <span className="hidden lg:block">Eliminar seleccionados</span>
        <MdDelete size={25} />
      </button>
    );
  }
}
