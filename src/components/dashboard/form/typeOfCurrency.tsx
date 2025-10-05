import { LuDollarSign } from "react-icons/lu";
export default function TypeOfCurrency({
  typeOfCurrency,
  onClickIcon,
}: {
  typeOfCurrency: "bs" | "dollar";
  onClickIcon: () => void;
}) {
  if (typeOfCurrency == "dollar") {
    return <LuDollarSign onClick={onClickIcon} className="cursor-pointer" />;
  } else {
    return (
      <span className="cursor-pointer" onClick={onClickIcon}>
        Bs
      </span>
    );
  }
}
