import "../css/container-actions.css";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import toastDeleteById from "@/components/Toast/data/toastDeleteById";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDataContext } from "../../../../hooks/useContextData";
import { ApiUrl, Data } from "@/models";
import { FaEye } from "react-icons/fa6";
import { Product } from "@/app/api/products/models";

export default function ContainerActions({
  id,
  apiUrl,
  data,
  includeActions,
  item,
}: {
  data: Data;
  id: number;
  apiUrl: ApiUrl;
  includeActions: { delete?: boolean; edit?: boolean };
  item?: Product;
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

  return (
    <div
      className={`flex justify-center gap-2 items-center overflow-hidden ${
        item ? "container-actions-red" : "container-actions"
      }`}
    >
      {includeActions.edit && disabled && (
        <div className={`container-icon`}>
          <FaEye size={20} />
        </div>
      )}
      {includeActions.edit && !disabled && (
        <Link href={`/dashboard${apiUrl}/` + id}>
          <FaEye size={20} />
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
