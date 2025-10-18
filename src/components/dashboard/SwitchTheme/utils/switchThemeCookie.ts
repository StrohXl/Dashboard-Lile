"use server";

import { cookies } from "next/headers";

export default async function switchThemeCookie(value: "dark" | "light") {

  const cookieStore = await cookies();
  cookieStore.set("theme", value, {
    maxAge: 365 * 24 * 60 * 60,
  });
  
}
