import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { useProductsContext } from "../hooks/hooksTable";
import toastDelete from "@/components/Toast/products/toastDelete";

export default function ContainerActions({ id }: { id: number }) {
  const { disabled, setPage, page, setDisabled, data, fetchProducts } =
    useProductsContext();

  const deleteProduct = async (id: number) => {
    setDisabled(true);
    await toastDelete(
      id,
      fetchProducts,
      data && data.products.length - 1 == 0 ? 1 : page
    );
    setDisabled(false);
    setPage(data && data.products.length - 1 == 0 ? 1 : page);
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
        onClick={() => deleteProduct(id)}
        className="text-gray-500 disabled:opacity-50 disabled:!cursor-not-allowed transition-colors duration-300 hover:text-primary cursor-pointer"
      >
        <MdDelete size={25} />
      </button>
    </div>
  );
}
