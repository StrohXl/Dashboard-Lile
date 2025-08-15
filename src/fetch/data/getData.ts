"use server";
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
  const node_env = process.env.DEPLOY_SITE || "";
  let siteUrl = "";
  if (node_env == "development") {
    siteUrl = process.env.URL_DEV || "http://localhost:3000";
    console.log("development", siteUrl);
  } else {
    // En producción, asegúrate de incluir el protocolo
    const host = (await headers()).get("host") as string;
    siteUrl = `https://${host}`; // Asume HTTPS en producción
    console.log("prod", siteUrl);
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
    console.info(data);
    return data;
  } catch (error) {
    console.error(error);
    return { data: [], pages: 0 };
  }
};

export default getData;
