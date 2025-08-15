"use server";
import TypeParams from "@/types/typeParams";
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
  console.log(node_env)
  let siteUrl = "";
  const host = (await headers()).get("host") as string;
  siteUrl = `https://${host}`; // Asume HTTPS en producción
  console.log("prod", siteUrl);
  return {siteUrl,node_env};
};

export default getData;
