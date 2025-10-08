"use server";

import { getUrl } from "@/utils/getUrl";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

import { ApiUrl } from "@/models";
import { ResponseGet } from "@/models/response/get/responseGet.model";
import { ResponseData } from "@/models/response/responseData.model";
import UrlParams from "@/models/url-params.model";

export default async function getAllData<T>({
  apiUrl,
  params,
}: {
  apiUrl: ApiUrl;
  params: UrlParams;
}): Promise<ResponseData<ResponseGet<T>>> {
  const cookieStore = await cookies();
  const myToken: RequestCookie | undefined = cookieStore.get("myToken");
  const siteUrl = await getUrl();

  try {
    const { data }: { data: ResponseData<ResponseGet<T>> } = await axios.get(
      `${siteUrl}/api${apiUrl}`,
      {
        params,
        headers: {
          Cookie: `${myToken?.name}=${myToken?.value}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.error(error);
    return {
      message: "message",
      status: 400,
    };
  }
}
