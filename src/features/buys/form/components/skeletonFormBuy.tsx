import Skeleton from "@/components/dashboard/skeleton/skeleton";

export default function SkeletonFormBuy() {
  return (
    <div className="flex flex-col gap-4 max-w-[750px] mt-12 !px-5 dark:!bg-gray-800 container-table">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-8 w-24" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-34" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div  className="flex flex-col gap-3 my-5" >
        <div className="grid grid-cols-[1fr_25%_25%_42px] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
        <div className="grid grid-cols-[1fr_25%_25%_42px] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
        <div className="grid grid-cols-[1fr_25%_25%_42px] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
        <div className="grid grid-cols-[1fr_25%_25%_42px] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
        </div>
      </div>

      <div className="">
        <Skeleton className="h-8 w-34" />
      </div>
    </div>
  );
}
