import { UseFieldArrayPrepend, UseFormGetValues } from "react-hook-form";
import { FormBuy } from "../models";
import SelectProductHook from "../hooks/select-product.hook";
import { addProduct, searchProduct } from "../utilities";
import { Product } from "@/app/api/products/models";

export default function SelectProductsFormBuy({
  getValues,
  prepend,
}: {
  getValues: UseFormGetValues<FormBuy>;
  prepend: UseFieldArrayPrepend<FormBuy>;
}) {
  const {
    open,
    products,
    search,
    setOpen,
    setProducts,
    setSearch,
    loading,
    setLoading,
  } = SelectProductHook();

  const onClickSelect = (product: Product) => {
    addProduct({ product, prepend, setOpen, setSearch });
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_auto] relative z-30 items-center gap-2 px-4 border-1 border-gray-700 rounded-md">
        <input
          value={search}
          type="text"
          className="py-2  outline-none text-gray-700 placeholder:text-gray-600 sm:max-w-[160px]"
          placeholder="Nombre del Producto"
          onChange={(item) =>
            searchProduct({
              text: item.target.value,
              setOpen,
              getValues,
              setProducts,
              setSearch,
              setLoading,
            })
          }
        />
      </div>
      <ul
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px",
        }}
        className={`flex left-0 mt-3 top-full w-full py-2 z-30 flex-col  rounded-md bg-white absolute h-fit max-h-[150px] overflow-auto  ${
          !open && "hidden"
        }`}
      >
        {loading ? (
          <li className="!px-4 font-roboto">Buscando...</li>
        ) : products.length == 0 ? (
          <li className="!px-4 font-roboto">No se encontraron productos</li>
        ) : (
          products.map((item) => (
            <li
              className="!px-4 transition-colors duration-300 font-roboto hover:bg-primary hover:text-white cursor-pointer py-1"
              onClick={() => onClickSelect(item)}
              key={item.id}
            >
              <p className="truncate"> {item.name}</p>
            </li>
          ))
        )}
      </ul>
      <div
        className={`fixed top-0  z-20  left-0 w-full h-full bg-transparent ${
          !open && "hidden"
        }`}
        onClick={() => setOpen(false)}
      ></div>
    </div>
  );
}
