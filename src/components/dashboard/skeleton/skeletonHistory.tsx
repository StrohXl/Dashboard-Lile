import Skeleton from "./skeleton";

export default function SkeletonHistory() {
  return (
    <div>
      <div className="flex flex-col gap-5 h-[330px] 2xl:h-[420px] w-[350px] overflow-hidden">
        <div className="items-center grid grid-cols-[1fr_1fr] gap-6 pt-3 ">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="items-center grid grid-cols-[1fr_1fr] gap-6 pt-3 ">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="items-center grid grid-cols-[1fr_1fr] gap-6 pt-3 ">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="items-center grid grid-cols-[1fr_1fr] gap-6 pt-3 ">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="items-center grid grid-cols-[1fr_1fr] gap-6 pt-3 ">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
        <div className="items-center grid grid-cols-[1fr_1fr] gap-6 pt-3 ">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
        </div>
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
