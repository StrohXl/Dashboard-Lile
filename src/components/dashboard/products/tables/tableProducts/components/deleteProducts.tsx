import { MdDelete } from "react-icons/md";
import { useProductsContext } from "../hooks/hooksTable";
import toastDeleteIds from "@/components/Toast/products/toastDeleteIds";

export default function DeleteProducts() {
  const {
    data,
    page,
    setPage,
    disabled,
    setDisabled,
    selects,
    setSelects,
    fetchProducts,
  } = useProductsContext();

  const deleteProductsArray = async () => {
    setDisabled(true);
    await toastDeleteIds({ ids: selects, setSelects, fetchProducts });
    setDisabled(false);
    setPage(data && data.products.length - 1 == 0 ? 1 : page);
  };

  if (selects.length != 0) {
    return (
      <button
        disabled={disabled}
        onClick={() => deleteProductsArray()}
        className="transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed border-gray-500 hover:border-primary  lg:border-1  p-1 lg:p-3 rounded-lg flex items-center gap-4 font-medium cursor-pointer w-fit text-gray-500 hover:text-primary"
      >
        <span className="hidden lg:block">
          Eliminar Productos seleccionados
        </span>
        <MdDelete size={25} />
      </button>
    );
  }
}
