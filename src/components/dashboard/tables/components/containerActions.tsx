import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import toastDeleteById from "@/components/Toast/data/toastDeleteById";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDataContext } from "../../../../hooks/useContextData";
import { Data } from "@/models";

export default function ContainerActions({
  id,
  apiUrl,
  data,
  includeActions,
}: {
  data: Data;
  id: number;
  apiUrl: "/buys" | "/products" | "/clients";
  includeActions: { delete?: boolean; edit?: boolean };
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
    <div className="flex justify-center gap-2 items-center overflow-hidden">
      {includeActions.edit && (
        <Link
          href={`/dashboard${apiUrl}/` + id}
          className="!text-gray-500 p-1 border-1 !border-gray-500 rounded-[5px] hover:!text-primary hover:!border-primary transition-colors duration-300 cursor-pointer"
        >
          <AiFillEdit size={20} />
        </Link>
      )}
      {includeActions.delete && (
        <button
          onClick={() => deleteData(id)}
          className="disabled:opacity-50 disabled:!cursor-not-allowed transition-colors duration-300 !text-gray-500 p-1 border-1 !border-gray-500 rounded-[5px] hover:!text-primary hover:!border-primary cursor-pointer"
          disabled={disabled}
        >
          <MdDelete size={20} />
        </button>
      )}
    </div>
  );
}
