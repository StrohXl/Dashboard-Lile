import "../css/container-actions.css";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaEye } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";

import { ApiUrl, Data } from "@/models";
import { Product } from "@/models/api/product";

import toastDeleteById from "@/components/Toast/data/toastDeleteById";

import { useDataContext } from "../../../../hooks/useContextData";

export default function ContainerActions({
  id,
  apiUrl,
  data,
  includeActions,
  item,
  setOpenDrawer,
}: {
  data: Data;
  id: number;
  apiUrl: ApiUrl;
  includeActions: { delete?: boolean; edit?: boolean; see?: boolean };
  item?: Product;
  setOpenDrawer?: (value: number) => void;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();
  const { disabled, setDisabled } = useDataContext();

  const deleteData = async (id: number) => {
    setDisabled(true);
    await toastDeleteById({
      id,
      apiUrl,
      searchParams,
      pathname,
      replace,
      data,
    });
    refresh();
    setDisabled(false);
  };

  const onClickSee = () => {
    if (setOpenDrawer) {
      setOpenDrawer(id);
    }
  };

  return (
    <div
      className={`flex justify-center gap-2 items-center overflow-hidden ${
        item ? "container-actions-red" : "container-actions"
      }`}
    >
      {includeActions.see && (
        <button onClick={onClickSee}>
          <FaEye size={20} />
        </button>
      )}
      {includeActions.edit && disabled && (
        <div className={`container-icon`}>
          <FaRegEdit size={20} />
        </div>
      )}
      {includeActions.edit && !disabled && (
        <Link href={`/dashboard${apiUrl}/` + id}>
          <FaRegEdit size={20} />
        </Link>
      )}
      {includeActions.delete && (
        <button onClick={() => deleteData(id)} disabled={disabled}>
          <MdDelete size={20} />
        </button>
      )}
    </div>
  );
}
