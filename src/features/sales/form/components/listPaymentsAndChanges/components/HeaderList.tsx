import { FaPlus } from "react-icons/fa";

export default function HeaderList({
  title,
  buttonAdded,
}: {
  title: "Pagos" | "Cambios";
  buttonAdded: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <h4 className="font-roboto text-gray-800 dark:text-white font-semibold text-lg">
        {title}
      </h4>
      <button
        onClick={buttonAdded}
        className="btn-outlined-primary"
        type="button"
      >
        Agregar
        <FaPlus />
      </button>
    </div>
  );
}
