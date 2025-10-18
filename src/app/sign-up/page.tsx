import { cookies } from "next/headers";

import PageSignUp from "@/features/sign-up/PageSignUp";

export default async function SignUp() {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie?.value == "light" ? "light" : "dark";

  return <PageSignUp theme={theme} />;
}
