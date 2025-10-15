"use client";
import Image from "next/image";

import FormLogin from "@/features/login/forms/formLogin";
import { useEffect, useState } from "react";

export default function Home() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    setTheme(window.localStorage.getItem("theme") ?? "dark");
  }, []);
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
