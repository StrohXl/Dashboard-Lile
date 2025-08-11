import TypeProduct from "@/app/api/products/type/typeProducts";
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
export default function SelectProductsFormBuy({
  options,
  changeSelect,
}: {
  options: TypeProduct[];
  changeSelect: (value: number) => void;
}) {
  const [search, setSearch] = useState<string>("");
  const [data, setData] = useState<TypeProduct[]>(options);
  const [openSelect, setOpenSelect] = useState<boolean>(false);

  const addProduct = (id: number) => {
    setOpenSelect(false);
    changeSelect(id);
    setSearch("");
    setData(options);
  };

  const searchProduct = (text: string) => {
    setSearch(text);
    if (text !== "") {
      setOpenSelect(true);
    } else {
      setOpenSelect(false);
    }
    setData(options.filter((item) => item.name.includes(text)));
  };

  return (
    <div className="relative">
      <div className="flex relative z-30 items-center gap-2 px-4 border-1 border-gray-700 rounded-md">
        <input
          value={search}
          type="text"
          className="py-2  outline-none text-gray-700 placeholder:text-gray-600"
          placeholder="Seleccionar producto"
          onChange={(item) => searchProduct(item.target.value)}
          onClick={() => setOpenSelect(true)}
        />
        <button
          onClick={() => setOpenSelect(!openSelect)}
          className="cursor-pointer"
          type="button"
        >
          <FaChevronDown
            className={`transition-transform duration-300  ${
              openSelect && "rotate-x-180"
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
          !openSelect && "hidden"
        }`}
      >
        {data.length == 0 ? (
          <li className="!px-4 font-roboto">No se encontraron productos</li>
        ) : (
          data.map((item) => (
            <li
              className="!px-4 transition-colors duration-300 font-roboto hover:bg-primary hover:text-white cursor-pointer py-1"
              onClick={() => addProduct(item.id ?? 1)}
              key={item.id}
            >
              <p className="truncate"> {item.name}</p>
            </li>
          ))
        )}
      </ul>

      <div
        className={`fixed top-0  z-20  left-0 w-full h-full bg-transparent ${
          !openSelect && "hidden"
        }`}
        onClick={() => setOpenSelect(false)}
      ></div>
    </div>
  );
}
