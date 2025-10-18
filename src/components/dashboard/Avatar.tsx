"use client";

import { User } from "@/models/api/user/user.model";
import { ResponseData } from "@/models/response/responseData.model";
import { use } from "react";

export default function Avatar({
  user,
}: {
  user: Promise<ResponseData<User>>;
}) {
  const { data } = use(user);
  return (
    <div className="uppercase flex justify-center items-center size-10 rounded-full font-bold shadow-sm dark:bg-gray-700 text-700 bg-white text-gray-700 dark:text-white">
      <span> {data && data.name[0]}</span>
    </div>
  );
}
