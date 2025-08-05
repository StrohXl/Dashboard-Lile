import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useDataContext } from "../../hooks/useContextData";
import toastDeleteData from "@/components/Toast/data/toastDeleteData";

export default function ContainerActions({ id }: { id: number }) {
  const { disabled, setPage, page, setDisabled, data, fetchData } =
    useDataContext();

  const deleteData = async (id: number) => {
    setDisabled(true);
    await toastDeleteData(
      id,
      "/products",
      fetchData,
      data && data.data.length - 1 == 0 ? 1 : page
    );
    setDisabled(false);
    setPage(data && data.data.length - 1 == 0 ? 1 : page);
  };

  return (
    <div className="flex gap-3 items-center overflow-hidden">
      <Link
        href={"/dashboard/products/" + id}
        className="text-gray-500 transition-colors duration-300 hover:text-primary cursor-pointer"
      >
        <AiFillEdit size={25} />
      </Link>
      <button
        disabled={disabled}
        onClick={() => deleteData(id)}
        className="text-gray-500 disabled:opacity-50 disabled:!cursor-not-allowed transition-colors duration-300 hover:text-primary cursor-pointer"
      >
        <MdDelete size={25} />
      </button>
    </div>
  );
}
