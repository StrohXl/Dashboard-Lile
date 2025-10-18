import { ResponseData } from "@/models/response/responseData.model";
import { ReactNode, use } from "react";

export default function CardSuspense({
  title,
  dataPromise,
  iconStart
}: {
  title: string;
  dataPromise: Promise<
    Omit<ResponseData<{ count: number }>, "data"> & { count?: number }
  >;
  iconStart?: ReactNode;
}) {
  const data = use(dataPromise);
  return (
    <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col gap-2 shadow-sm">
      <p className=" font-medium text-gray-800 text-lg dark:text-white">
        {title}
      </p>
      <p className="text-3xl font-bold text-gray-700 dark:text-white">
        {iconStart}
        {data.count}
      </p>
    </div>
  );
}
