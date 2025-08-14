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

  try {
    const { data } = await axios.get(`/api${url}`, {
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
