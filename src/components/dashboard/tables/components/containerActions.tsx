import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import toastDeleteById from "@/components/Toast/data/toastDeleteById";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDataContext } from "../../hooks/useContextData";
import { TypeData } from "@/types/data";

export default function ContainerActions({
  id,
  apiUrl,
  data,
}: {
  data: TypeData;
  id: number;
  apiUrl: "/buys" | "/products";
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
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
    setDisabled(false);
  };

  return (
    <div className="flex gap-3 items-center overflow-hidden">
      <Link
        href={`/dashboard${apiUrl}/` + id}
        className="text-gray-500 transition-colors duration-300 hover:text-primary cursor-pointer"
      >
        <AiFillEdit size={25} />
      </Link>
      <button
        onClick={() => deleteData(id)}
        className="text-gray-500 disabled:opacity-50 disabled:!cursor-not-allowed transition-colors duration-300 hover:text-primary cursor-pointer"
        disabled={disabled}
      >
        <MdDelete size={25} />
      </button>
    </div>
  );
}
