"use server";
import { headers } from "next/headers";

export async function getUrl() {
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
  return siteUrl;
}
