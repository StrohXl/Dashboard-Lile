import { ReactNode } from "react";

export default function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <div
      className={`rounded-[20px] p-6 relative dark:bg-gray-700 bg-white text-gray-800 dark:text-white  dark:shadow-gray-700 ${className}`}
    >
      {" "}
      {children}
    </div>
  );
}
