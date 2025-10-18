export default function CardSuspenseLoading() {
  return (
    <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
      <p className=" font-medium text-gray-800 text-lg dark:text-white h-[22px] bg-gray-400 rounded-sm animate-pulse"></p>
      <p className="text-3xl font-bold bg-gray-400 rounded-sm animate-pulse text-gray-700 dark:text-white h-[30px]"></p>
    </div>
  );
}
