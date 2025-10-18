import Skeleton from "@/components/dashboard/skeleton/skeleton";

export default function SkeletonFormProduct() {
  return (
    <div className="flex flex-col gap-4 max-w-[800px] !px-5 container-table dark:!bg-gray-800">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-8 w-24" />
      </div>
      <div className="flex flex-col gap-3 mt-5 mb-3">
        <div className="">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="">
          <Skeleton className="h-5 w-1/4" />
          <Skeleton className="h-8 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4" >
          <div className="">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-8 w-full" />
          </div>
          <div className="">
            <Skeleton className="h-5 w-1/4" />
            <Skeleton className="h-8 w-full" />
          </div>
        </div>
      </div>
      <div className="">
        <Skeleton className="h-8 w-34" />
      </div>
    </div>
  );
}
