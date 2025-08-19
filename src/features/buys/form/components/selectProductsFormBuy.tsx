import { FieldArrayWithId } from "react-hook-form";
import { FaChevronDown } from "react-icons/fa";
import { FormBuy } from "../models";
import { Product } from "@/app/api/products/models";
import SelectProductHook from "../hooks/select-product.hook";
import { addProduct, openSelect, searchProduct } from "../utilities";
export default function SelectProductsFormBuy({
  options,
  changeSelect,
  fields,
}: {
  fields: FieldArrayWithId<FormBuy>[];
  options: Product[];
  changeSelect: (value: number) => void;
}) {
  const { open, products, search, setOpen, setProducts, setSearch } =
    SelectProductHook({ dataProducts: options });

  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_auto] relative z-30 items-center gap-2 px-4 border-1 border-gray-700 rounded-md">
        <input
          value={search}
          type="text"
          className="py-2  outline-none text-gray-700 placeholder:text-gray-600 sm:max-w-[160px]"
          placeholder="Seleccionar producto"
          onChange={(item) =>
            searchProduct({
              text: item.target.value,
              fields,
              products,
              setOpen,
              setProducts,
              setSearch,
            })
          }
          onClick={() =>
            openSelect({
              fields,
              open,
              products,
              setOpen,
              setProducts,
            })
          }
        />
        <button
          onClick={() =>
            openSelect({
              fields,
              open,
              products,
              setOpen,
              setProducts,
            })
          }
          className="cursor-pointer"
          type="button"
        >
          <FaChevronDown
            className={`transition-transform duration-300  ${
              open && "rotate-x-180"
            }`}
            size={14}
          />
        </button>
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
        {products.length == 0 ? (
          <li className="!px-4 font-roboto">No se encontraron productos</li>
        ) : (
          products.map((item) => (
            <li
              className="!px-4 transition-colors duration-300 font-roboto hover:bg-primary hover:text-white cursor-pointer py-1"
              onClick={() =>
                addProduct({
                  id: item.id,
                  changeSelect,
                  products,
                  setOpen,
                  setProducts,
                  setSearch,
                })
              }
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
