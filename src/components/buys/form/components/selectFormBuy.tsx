import TypeProduct from "@/app/api/products/type/typeProducts";

export default function SelectFormBuy({
  options,
  changeSelect,
}: {
  options: TypeProduct[];
  changeSelect: (value:string) => void;
}) {
  return (
    <select
      name=""
      id=""
      onChange={(value) => changeSelect(value.target.value)}
    >
      <option value="">Seleccionar Producto</option>
      {options.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
}
