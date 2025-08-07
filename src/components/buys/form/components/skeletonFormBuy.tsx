import Skeleton from "@/components/dashboard/skeleton/skeleton";

export default function SkeletonFormBuy() {
  return (
    <div className="flex flex-col gap-4 max-w-[550px] mt-12 !px-5 container-table">
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-8 w-24" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-34" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
      <div  className="flex flex-col gap-3 my-5" >
        <div className="grid grid-cols-[1fr_20%_20%_auto] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8 w-6" />
        </div>
        <div className="grid grid-cols-[1fr_20%_20%_auto] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8 w-6" />
        </div>
        <div className="grid grid-cols-[1fr_20%_20%_auto] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8 w-6" />
        </div>
        <div className="grid grid-cols-[1fr_20%_20%_auto] items-center gap-3">
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8" />
          <Skeleton className="h-8 w-6" />
        </div>
      </div>

      <div className="">
        <Skeleton className="h-8 w-34" />
      </div>
    </div>
  );
}
