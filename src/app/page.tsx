import { cookies } from "next/headers";
import Image from "next/image";

import FormLogin from "@/features/login/forms/formLogin";

export default async function Home() {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie?.value == "light" ? "light" : "dark";

  return (
    <main data-theme={theme}>
      <section className="h-dvh bg-[#f6f7f8] dark:bg-dark relative flex items-center justify-center">
        <Image
          src={"/21317.jpg"}
          className="z-1 object-cover opacity-10"
          fill
          alt="Login"
          priority
        />
        <FormLogin />
      </section>
    </main>
  );
}
