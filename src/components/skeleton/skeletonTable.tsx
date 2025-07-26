import Skeleton from "./skeleton";

export default function SkeletonTable() {
  return (
    <div className="flex flex-col gap-5">
      <div className="items-center grid grid-cols-[200px_1fr_150px_150px_250px_250px_100px] pt-5 ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_150px_150px_250px_250px_100px] pt-5 border-t-1 border-[#e0e0e0] ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <div className="flex gap-3 justify-center" >
          <Skeleton className="h-8 w-8 !rounded-full" />
          <Skeleton className="h-8 w-8 !rounded-full" />
        </div>
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_150px_150px_250px_250px_100px] pt-5 border-t-1 border-[#e0e0e0] ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <div className="flex gap-3 justify-center" >
          <Skeleton className="h-8 w-8 !rounded-full" />
          <Skeleton className="h-8 w-8 !rounded-full" />
        </div>
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_150px_150px_250px_250px_100px] pt-5 border-t-1 border-[#e0e0e0] ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <div className="flex gap-3 justify-center" >
          <Skeleton className="h-8 w-8 !rounded-full" />
          <Skeleton className="h-8 w-8 !rounded-full" />
        </div>
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_150px_150px_250px_250px_100px] pt-5 border-t-1 border-[#e0e0e0] ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <div className="flex gap-3 justify-center" >
          <Skeleton className="h-8 w-8 !rounded-full" />
          <Skeleton className="h-8 w-8 !rounded-full" />
        </div>
      </div>
      <div className="items-center grid grid-cols-[200px_1fr_150px_150px_250px_250px_100px] pt-5 border-t-1 border-[#e0e0e0] ">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-34" />
        <Skeleton className="h-6 w-34" />
        <div className="flex gap-3 justify-center" >
          <Skeleton className="h-8 w-8 !rounded-full" />
          <Skeleton className="h-8 w-8 !rounded-full" />
        </div>
      </div>
    </div>
  );
}
