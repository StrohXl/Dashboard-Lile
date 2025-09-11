import { IconType } from "react-icons/lib";

export default function NotHave({
  icon,
  message,
}: {
  icon: IconType;
  message: string;
}) {
  const Icon = icon;
  return (
    <div className="pb-3 h-80 flex flex-col justify-center items-center">
      <Icon size={200} className="text-gray-500" />
      <h4 className="font-open_sans text-lg mt-3  text-gray-700">{message}</h4>
    </div>
  );
}
