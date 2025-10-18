"use server";

import { getUrl } from "@/utils/getUrl";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

import { ApiUrl } from "@/models";
import { ResponseData } from "@/models/response/responseData.model";
import UrlParams from "@/models/url-params.model";

export default async function getCountData({
  apiUrl,
  params,
}: {
  apiUrl: ApiUrl;
  params?: UrlParams;
}): Promise<
  Omit<ResponseData<{ count: number }>, "data"> & {
    count?: number;
  }
> {
  const cookieStore = await cookies();
  const myToken: RequestCookie | undefined = cookieStore.get("myToken");
  const siteUrl = await getUrl();

  try {
    const {
      data,
    }: {
      data: Omit<ResponseData<{ count: number }>, "data"> & { count: number };
    } = await axios.get(`${siteUrl}/api${apiUrl}`, {
      params,
      headers: {
        Cookie: `${myToken?.name}=${myToken?.value}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return {
      status: 400,
      message: "message",
    };
  }
}
