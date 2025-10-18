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
      className={`rounded-[20px] p-6 relative dark:bg-gray-800 bg-white  container-shadow ${className}`}
    >
      {children}
    </div>
  );
}
