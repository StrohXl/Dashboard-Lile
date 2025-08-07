'use server'
import TypeParams from "@/types/typeParams";
import axios from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies, headers } from "next/headers";

const getData = async ({
  url,
  params,
}: {
  url: "/buys" | "/products";
  params?: TypeParams;
}) => {
  // Obtener el token
  const cookieStore = await cookies();
  const myToken: RequestCookie | undefined = cookieStore.get("myToken");

  // Obtener url de dominio
  const node_env = process.env.NODE_ENV || "";
  const siteUrl =
    node_env === "development"
      ? process.env.URL_DEV || ""
      : ((await headers()).get("host") as string);

      
  try {
    const { data } = await axios.get(`${siteUrl}/api${url}`, {
      params,
      headers: {
        Cookie: `${myToken?.name}=${myToken?.value}`,
      },
    });
    return data;
  } catch (error) {
    console.log(error);
    return { data: [], pages: 0 };
  }
};

export default getData;
