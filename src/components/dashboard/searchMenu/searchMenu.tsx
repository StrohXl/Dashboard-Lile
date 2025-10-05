import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type Object = {
  label: string;
};

type OptionsMenu<T extends Object> = T[];

export default function SearchMenu<T extends Object>({
  loading,
  options,
  onChange,
  type = "text",
  onClickItem,
  closeMenu,
  open,
  loadingMessage = "Buscando...",
  notFoundMessage = "Vacio",
  textSearch,
  placeholder = "Buscar...",
}: {
  loading: boolean;
  options: OptionsMenu<T>;
  onChange?: (value: string | number) => void;
  onClickItem?: (value: T) => void;
  closeMenu: () => void;
  type?: HTMLInputTypeAttribute;
  open: boolean;
  loadingMessage?: string;
  notFoundMessage?: string;
  textSearch: string;
  placeholder?: string;
}) {
  const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(event.target.value);
    }
  };

  const onClickSelect = (value: T) => {
    if (onClickItem) {
      onClickItem(value);
    }
  };

  return (
    <div className="relative">
      <div className="grid grid-cols-[1fr_auto] relative z-30 items-center gap-2 px-4 border-1 border-gray-700 rounded-md">
        <input
          value={textSearch}
          type={type}
          className="py-2  outline-none text-gray-700 placeholder:text-gray-600 w-full"
          placeholder={placeholder}
          onChange={(event) => onChangeInput(event)}
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
          <li className="!px-4 font-roboto">{loadingMessage}</li>
        ) : options.length == 0 ? (
          <li className="!px-4 font-roboto">{notFoundMessage}</li>
        ) : (
          options.map((item, index) => (
            <li
              className="!px-4 transition-colors duration-300 font-roboto hover:bg-primary hover:text-white cursor-pointer py-1"
              onClick={() => onClickSelect(item)}
              key={index}
            >
              <p className="truncate"> {item.label}</p>
            </li>
          ))
        )}
      </ul>
      <div
        className={`fixed top-0  z-20  left-0 w-full h-full bg-transparent ${
          !open && "hidden"
        }`}
        onClick={closeMenu}
      ></div>
    </div>
  );
}
