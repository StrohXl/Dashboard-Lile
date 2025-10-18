"use server";
import { getUrl } from "@/utils/getUrl";
import axios, { AxiosError } from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";

import { ApiUrl } from "@/models";
import { ResponseGetById } from "@/models/response/get/responseGetById.model";
import { Response } from "@/models/response/response.model";
import { ResponseData } from "@/models/response/responseData.model";


export default async function getDataById<T>({
  apiUrl,
  id,
}: {
  apiUrl: ApiUrl;
  id: number;
}): Promise<
  Omit<ResponseData<ResponseGetById<T>>, "data"> & { data?: ResponseGetById<T> }
> {
  const cookieStore = await cookies();
  const myToken: RequestCookie | undefined = cookieStore.get("myToken");
  const siteUrl = await getUrl();

  try {
    const { data }: { data: Response<ResponseGetById<T>> } = await axios.get(
      `${siteUrl}/api${apiUrl}/${id}`,
      {
        headers: {
          Cookie: `${myToken?.name}=${myToken?.value}`,
        },
      }
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw error;
    }
    throw error;
  }
}
