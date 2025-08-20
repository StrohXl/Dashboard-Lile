import Skeleton from "./skeleton";

export default function SkeletonTable() {
  return (
    <div className="flex flex-col gap-5">
      <div className="items-center grid grid-cols-[200px_1fr_250px_250px_100px] gap-6 pt-5 ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_250px_250px_100px] gap-6 pt-5 ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_250px_250px_100px] gap-6 pt-5 ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_250px_250px_100px] gap-6 pt-5 ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_250px_250px_100px] gap-6 pt-5 ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="flex h-[32px] mt-6 justify-center gap-2 items-center">
        <Skeleton className="h-[30px] w-[32px]" />
        <Skeleton className="h-[30px] w-[32px]" />
        <Skeleton className="h-[30px] w-[32px]" />
        <Skeleton className="h-[30px] w-[32px]" />
      </div>
    </div>
  );
}
