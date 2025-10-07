"use server";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";

import { ApiUrl } from "@/models";
import UrlParams from "@/models/url-params.model";

const getData = async ({
  url,
  params,
}: {
  url: ApiUrl;
  params?: UrlParams;
}) => {
  // Obtener el token
  const cookieStore = await cookies();
  const myToken: RequestCookie | undefined = cookieStore.get("myToken");

  // Obtener url de dominio
  const node_env = process.env.VERCEL_ENV || "";
  let siteUrl = "";
  if (node_env != "production") {
    siteUrl = process.env.URL_DEV || "http://localhost:3000";
  } else {
    // En producción, asegúrate de incluir el protocolo
    const host = (await headers()).get("host") as string;
    siteUrl = `https://${host}`; // Asume HTTPS en producción
    const protocol =
      (await headers()).get("x-forwarded-proto") === "https" ? "https" : "http";
    siteUrl = `${protocol}://${host}`;
  }
  try {
    const { data } = await axios.get(`${siteUrl}/api${url}`, {
      params,
      headers: {
        Cookie: `${myToken?.name}=${myToken?.value}`,
      },
    });
    return data;
  } catch (error) {
    console.error(error);
    return { data: [], pages: 0 };
  }
};

export default getData;
