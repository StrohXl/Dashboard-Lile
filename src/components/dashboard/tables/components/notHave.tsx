import { IconType } from "react-icons/lib";

export default function NotHave({
  icon,
  message,
  size = 200,
  height = 320,
}: {
  icon: IconType;
  message: string;
  size?: number;
  height?: number;
}) {
  const Icon = icon;
  return (
    <div className={`pb-3 h-[${height}px]  my-auto flex flex-col justify-center items-center`}>
      <Icon size={size} className="text-gray-500" />
      <h4 className="font-open_sans text-lg mt-3  text-gray-700">{message}</h4>
    </div>
  );
}
